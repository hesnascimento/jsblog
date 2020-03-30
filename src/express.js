const expres = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = expres()

app.set('view engine', 'ejs')
app.use(helmet())
app.use(morgan('combined'))
app.use(expres.urlencoded({ extended: true }))
app.use(expres.json())
app.use(expres.static('./public'))

module.exports = app
