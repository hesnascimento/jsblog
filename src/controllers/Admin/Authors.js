const UserService = require('../../services/Users')

const index = async (req, res) => {
  const { q : query } = req.query
  const users = await UserService.listUsers(query)
  res.render('admin/authors', { users })
}

module.exports = {
  index
}
