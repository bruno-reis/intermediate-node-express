const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

let dbPassword;
const saltRounds = 8



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', next => {
  if (!this.isModified('password')) return next()

  return bcrypt
    .hash(this.password, saltRounds)
    .then( hashedPassword => {
      this.password = hashedPassword
      return next()
    })
    .catch(err => {
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



