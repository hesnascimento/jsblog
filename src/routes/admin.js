const router = require('express').Router()

const Admin = require('../controllers/Admin')

router.get('/login', Admin.Auth.index)
router.post('/login', Admin.Auth.doLogin)

router.get('/register', Admin.Register.index)
router.post('/register', Admin.Register.doRegister)

router.get('/', Admin.Dashboard.index)
router.get('/dashboard', Admin.Dashboard.index)

router.get('/authors', Admin.Authors.index)

module.exports = router
