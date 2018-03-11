exports.loginRequired = (req, res, next) => {
  if (!req.session.user_id) {
    req.flash('error', 'Please log in')
    res.redirect('/users/login')
  } else {
    next()
  }
}

exports.ensureCorrectUser = (req, res, next) => {
  if (req.session.user_id !== req.param.id) {
    req.flash('error', 'Unauthorized!')
    res.redirect('/users')
  }
}
