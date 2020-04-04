const isUserValid = user => (
    user
    && user.displayName
    && user.password
    && user.email
    && user.password.length >= 6
    && isEmailValid(user.email)
  )

const generateRandomString = len => ' '
  .repeat(len)
  .split('')
  .map(() => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_'[Math.round(Math.random() * 62)])
  .join('')

const isEmailValid = email => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))


module.exports = {
  isUserValid,
  isEmailValid,
  generateRandomString,
}
