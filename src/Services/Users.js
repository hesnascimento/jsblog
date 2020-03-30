const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const { Users } = require('../models')
const UserHelpers = require('./UsersHelpers')
const ServiceError = require('./ServiceError')

const register = async user => {
  if (!user)
    throw new ServiceError(400, 'User not sent!')

  if (!UserHelpers.isUserValid(user))
    throw new ServiceError(400, 'Invalid user!')

  const { SALT, CONFIRMATION_CODE_LENGTH } = process.env

  const hashedPassword = crypto
    .createHash('md5')
    .update(`${user.password}::${SALT}`)
    .digest('hex')

  const userToDb = {
    ...user,
    disabled: false,
    confirmed: false,
    confirmationCode: UserHelpers.generateConfirmationCode(CONFIRMATION_CODE_LENGTH), //TODO: Generate Confirmation Code
    password: hashedPassword,
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

  // TODO: Validate email

  try {
    const user = Users.findOne({ email, disabled: false, confirmed: true })

    if (!user)
      throw new ServiceError(401, 'User not found.')

    const { SALT } = process.env

    const saltedPassword = crypto
      .createHash('md5')
      .update(`${password}::${SALT}`)
      .digest('hex')

    if (user.recovery === true)
      throw new ServiceError(401, 'This user is in recovery, please check your email to reset you password.')

    if (saltedPassword !== user.password) {
      const toDb = {}

      if (user.passwordTries === 2) {
        toDb.passwordTries = 0
        // TODO: Call recovery function
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

    // TODO: Add private/public key for sign an validate token

    return jwt.sign({ id: user.id }, 'secret')
  } catch (error) {

  }
}

module.exports = {
  register,
  confirmAccount,
  login
}
