const crypto = require('crypto')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const { Users } = require('../models')
const ServiceError = require('./ServiceError')
const UserHelpers = require('./UsersHelpers')

const register = async user => {
  if (!user)
    throw new ServiceError(400, 'User not sent!')

  if (!UserHelpers.isUserValid(user))
    throw new ServiceError(400, 'Invalid user!')

  const SALT = UserHelpers.generateRandomString(16)

  const hashedPassword = crypto
    .createHash('md5')
    .update(`${user.password}::${SALT}`)
    .digest('hex')

  const userToDb = {
    ...user,
    disabled: false,
    confirmed: false,
    confirmationCode: UserHelpers.generateRandomString(32), //TODO: Send mail
    password: `${hashedPassword}::${SALT}`,
    creationDate: new Date()
  }

  try {
    await Users.create(userToDb)

    // TODO: Send mail
    return true
  } catch (error) {
    console.error(
      'REQUEST =>',
      user,
      'ERROR =>',
      error)

    throw new ServiceError(500, 'Internal server error.')
  }
}

const confirmAccount = async code => {
  if (!code)
    throw new ServiceError(400, 'Confirmation code not sent!')

  // TODO: Validate confirmation code format

  try {
    const user = await Users.findOne({
      where: {
        confirmed: false,
        confirmationCode: code
      }
    })

    if (!user)
      throw new ServiceError(404, 'Not found.')

    await Users.update({
      confirmed: true,
      confirmationCode: null,
      confirmationDate: new Date()
    }, {
      where: {
        id: user.id
      }
    })

    // Send wellcome mail
    return true
  } catch (error) {
    console.error(
      'REQUEST =>',
      code,
      'ERROR =>',
      error)

    throw new ServiceError(500, 'Internal server error.')
  }
}

const login = async (email, password) => {
  if (!email || !password)
    throw new ServiceError(400, 'Email and Password must not be null.')

  if(!UserHelpers.isEmailValid(email))
    throw new ServiceError(400, 'Email is not valid.')

  try {
    const user = await Users.findOne({
      where: {
        email,
        disabled: false,
        confirmed: true
      }
    })

    if (!user)
      throw new ServiceError(401, 'User not found.')

    if (user.recovery === true)
      throw new ServiceError(401, 'This user is in recovery, please check your email to reset you password.')

    const [dbPassword, SALT] = user.password.split('::')

    const saltedPassword = crypto
      .createHash('md5')
      .update(`${password}::${SALT}`)
      .digest('hex')

    if (saltedPassword !== dbPassword) {
      const toDb = {}

      if (user.passwordTries === 2) {
        toDb.passwordTries = 0
        await sendRecovery(user.email)

        throw new ServiceError(401, 'Account blocked, a recovery code was sent to your email.')
      }

      toDb.passwordTries = user.passwordTries + 1

      await Users.update({ id: user.id }, toDb)

      throw new ServiceError(401, 'Invalid password.')
    }

    const toDb = {
      passwordTries: 0,
      lastLogin: new Date()
    }

    await Users.update({ id: user.id }, toDb)

    const privateKey = fs.readFileSync(`./keys/blog_rsa`)

    return jwt.sign({ id: user.id }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2h'
    })
  } catch (error) {
    console.error(
      'REQUEST =>',
      email,
      'ERROR =>',
      error)

    if(error.code) {
      throw error
    }

    throw new ServiceError(500, 'Internal server error.')
  }
}

const getUserByToken = async token => {
  if (!token)
    throw new ServiceError(401, 'Token not sent.')

  const key = fs.readFileSync('./keys/blog_rsa.pem')

  try {
    const data = jwt.verify(token, key, { algorithms: ['RS256']})
    const user = await Users.findOne({ id: data.user })

    if (!user)
    throw new ServiceError(401, 'Invalid token.')

    return user
  } catch (error) {
    console.error(
      'REQUEST =>',
      token,
      'ERROR =>',
      error)

    throw new ServiceError(401, 'Invalid token.')
  }
}

const sendRecovery = async email => {
  if (!email)
    throw new ServiceError(400, 'Email must not be null.')

  if(!UserHelpers.isEmailValid(email))
    throw new ServiceError(400, 'Email is not valid.')

  const user = await Users.findOne({ email, disabled: false })

  if (!user)
    throw new ServiceError(400, 'User not found.')

  if (user.recovery && moment(user.recoveryDate).diff(new Date, 'hours') <= 24)
    throw new ServiceError(400, 'There is a pending recovery process.')

  const recoveryCode = UserHelpers.generateRandomString(32)

  await Users.update({ id: user.id }, {
    recovery: recoveryCode,
    recoveryTries: 0,
    recoveryDate: new Date()
  })

  // TODO: Send recovery mail

  return true
}

module.exports = {
  register,
  confirmAccount,
  login,
  getUserByToken,
  sendRecovery
}
