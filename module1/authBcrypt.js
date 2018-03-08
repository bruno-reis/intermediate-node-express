const bcrypt = require('bcrypt')

const password = 'secret'
let dbPassword;
const saltRounds = 8

bcrypt
  .hash(password, saltRounds)
  .then( hashedPassword => {
    console.log('hash', hashedPassword)
    return hashedPassword
  })
  .then( hash => {
    return bcrypt.compare(password, hash)
  })
  .then( res => {
    console.log('match', res)
  })
