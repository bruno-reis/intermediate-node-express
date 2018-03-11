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
    req.flash('error', 'Unauthorized! Wrong User')
    res.redirect('/users')
  } else {
    next()
  }
}

exports.ensureAdminUser = (req, res, next) => {
  if (!req.session.isAdmin) {
    req.flash('error', 'Unauthorized! Needs Privileges')
    res.redirect('/users')
  } else {
    next()
  }
}
