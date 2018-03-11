const express = require('express')
const router = express.Router()
const db = require('../models')
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
  db.User.find()
    .then(users => {
      res.render('user-list', {users})
    })

})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/new', (req, res) => {
  res.render('user-new')
})

router.get('/:id', (req, res) => {
  db.User.findById(req.params.id)
    .then( user => {
      res.render('user', {user})
    })

})

router.get('/:id/edit', (req, res) => {
  db.User.findById(req.params.id)
    .then( user => {
      res.render('user-edit', {user})
    })
})

router.patch('/:id', (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body)
    .then( () => {
      res.redirect('/users')
    })

})

router.delete('/:id', (req, res) => {
  db.User.findByIdAndRemove(req.params.id, req.body)
    .then( () => {
      res.redirect('/users')
    })

})

router.post('/new', (req, res) => {
  db.User.create(req.body)
    .then( () => {
      res.redirect('/users/login')
    })
    .catch( err => {
      res.render('error', {error: err, message: err.message})
    })

})

router.post('/login', (req, res) => {
  db.User.findOne( {username: req.body.username})
    .then( foundUser => {
      foundUser.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          req.session.used_id = foundUser.id
          req.session.isAdmin = foundUser.isAdmin
          req.flash('message', 'Logged in')
          res.redirect('/users')
        } else {
          req.flash('message', 'Invalid Credentials')
          res.redirect('/users/login')
        }
      })
    })
})

module.exports = router