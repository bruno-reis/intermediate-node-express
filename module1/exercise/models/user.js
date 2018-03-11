const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 8

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

userSchema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  return bcrypt
    .hash(user.password, saltRounds)
    .then( hashedPassword => {
      user.password = hashedPassword
      return next()
    })
    .catch(err => {
      console.log(err)
      return next(err)
    })
})

userSchema.methods.comparePassword = (candidatePassword, next) => {
  return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err)

    return next(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)
module.exports = User
