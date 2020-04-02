const app = require('./express')

if (process.env.NODE_ENV === 'DEV')
  require('dotenv/config')

app.listen(process.env.PORT || 80, () => {
  console.log('Application Started on port', process.env.PORT)
})
