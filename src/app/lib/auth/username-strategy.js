import UsernameStrategy from './passport-username'
import User from '../models/User'

export default new UsernameStrategy(function getUser(username, done) {
  console.log('usernameStrategy', username)
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return User.create({ username })
      }
      return user
    })
    .then((user) => {
      done(null, user)
    })
    .catch(err => {
      done(err)
    })
})
