const UserService = require('../../services/Users')
const index = (req, res) => {
  res.render('admin/register', {
    errorMessage: ''
  })
}

const doRegister = async (req, res) => {
  const { email, password, displayName } = req.body

  try {
    // await UserService.register({
    //   email,
    //   password,
    //   displayName
    // })

    res.render('admin/register-success', {
      email
    })
  } catch (error) {
    res.render('admin/register', {
      errorMessage: error.message
    })
  }
}

module.exports ={
  index,
  doRegister
}
