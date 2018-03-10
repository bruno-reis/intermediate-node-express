'use strict'
require('dotenv').load()
const secret = process.env.SECRET_KEY
const session = require('cookie-session')


app.use(session({
  secret: secret
}))

app.post('/login', (req, res, next) => {
  db.User.find(req.body.username)
    .then( foundUser => {
      foundUser.comparePassword(req.body.password, match => {
        if (match) req.session.user_id = foundUser.id
      })
    })
})

