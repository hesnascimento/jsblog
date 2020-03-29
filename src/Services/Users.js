const { Users } = require('../models')
const UserHelpers = require('./UsersHelpers')
const ServiceError = require('./ServiceError')
const crypto = require('crypto')

const register = async user => {
  if (!user)
    throw new ServiceError('400', 'User not sent!')

  if (!UserHelpers.isUserValid(user))
    throw new ServiceError('400', 'Invalid user!')

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

  await Users.create(userToDb)

  // TODO: Send mail
  return true
}

module.exports = {
  register
}
