'use strict'
router.post('/login', (req, res, next) => {
  return User.findOne({ username: req.body.username})
    .then(user => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          return res.send('logged in!')
        } else {
          return res.redirect('/users/login')
        }

      })
    })
    .catch(err => {
      return res.send(err)
    })
})
