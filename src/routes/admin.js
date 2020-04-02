const router = require('express').Router()

const Admin = require('../controllers/Admin')

router.get('/login', Admin.Auth.indexLogin)
router.post('/login', Admin.Auth.doLogin)

module.exports = router
