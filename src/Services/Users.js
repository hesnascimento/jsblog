const { Users } = require('../models')
const UserHelpers = require('./UsersHelpers')
const ServiceError = require('./ServiceError')
const crypto = require('crypto')

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

module.exports = {
  register,
  confirmAccount
}
