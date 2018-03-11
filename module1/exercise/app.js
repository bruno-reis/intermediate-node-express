require('dotenv').load()
const express = require('express')
const app = express()
const methodOverdide = require('method-override')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const flash = require('connect-flash')
const userRoutes = require('./routes/users')

app.set('view_engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverdide('_method'))
app.use(session ({secret: process.env.SECRET_KEY}))
app.use(flash())

const serverPort = process.env.SERVER_PORT

app.get('/', (req, res) => {
  res.redirect('/users/login')
})

//flash message to all routes
app.use( (req, res, next) => {
  res.locals.message = req.flash('message')
  next()
})

app.use('/users', userRoutes)

app.use( (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use( (err, req, res, next) => {
  let error = app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: error
  })
})

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`)
})