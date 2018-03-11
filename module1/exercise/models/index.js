require('dotenv').load()
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.set('debug', 'true')
mongoose.connect(process.env.DB_URI)
  .catch( error => {
    console.log(`Error on connecting to DB at: ${process.env.DB_URI}`, error)
    throw error
  })

module.exports.User = require('./user')
