const expres = require('express')

const app = expres()

app.set('view engine', 'ejs')

app.use(expres.urlencoded({ extended: true }))
app.use(expres.json())

module.exports = app
