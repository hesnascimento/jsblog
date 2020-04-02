const i18n = require('../../i18n')
const UserServices = require('../../services/Users')
const indexLogin = (req, res) => {
  res.render('admin/login', {
    errorMessage: ''
  })
}

const doLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const token = await UserServices.login(email, password)
    res.cookie(_user, token, { httpOnly: true })
    res.redirect('/admin')
  } catch (error) {
    res.render('admin/login', {
      errorMessage: i18n('pt-br').translate(error.message)
    })
  }
}

module.exports = {
  indexLogin,
  doLogin
}
