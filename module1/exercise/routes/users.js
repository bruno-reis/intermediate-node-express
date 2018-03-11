const express = require('express')
const router = express.Router()
const db = require('../models')
const auth = require('../middleware/auth')

router.get('/', auth.loginRequired, (req, res) => {
  res.render('index')
})

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router