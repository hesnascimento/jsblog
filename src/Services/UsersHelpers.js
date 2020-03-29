const isUserValid = user => {
  if (!user.displayName || !user.password || !user.email)
    return false

  if (user.password.lenght <= 6)
    return false

  // TODO: Validate email

  return true
}

const generateConfirmationCode = len => {
  const range = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_'

  let code = ''

  for (let i = 0; i < len; i++) {
    const selector = Math.round(Math.random() * (range.length - 1))
    code += range[selector]
  }

  return code
}

module.exports = {
  isUserValid,
  generateConfirmationCode
}
