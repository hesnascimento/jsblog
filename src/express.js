const expres = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const routes = require('./routes')

const app = expres()

app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(helmet())
app.use(morgan('combined'))
app.use(expres.urlencoded({ extended: true }))
app.use(expres.json())
app.use(expres.static('./public'))

app.use(routes)

module.exports = app
