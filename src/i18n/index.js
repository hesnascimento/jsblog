const fs = require('fs')
const util = require('util')

const init = language => {
  const translateFile = fs.readFileSync(`${__dirname}/${language}.json`)
  const translateObject = JSON.parse(translateFile)

  const translate = (message, values) => {
    const translated = translateObject[message] || message

    return values ? util.format(translated, ...values) : translated
  }

  return {
    translate
  }
}

module.exports = init
