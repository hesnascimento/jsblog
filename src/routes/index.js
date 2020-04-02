const router = require('express').Router()
const Admin = require('./admin')

router.use('/admin', Admin)

module.exports = router
