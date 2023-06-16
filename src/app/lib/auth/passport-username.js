import { Strategy } from 'passport-strategy'
import { inherits } from 'util';

function UsernameStrategy(getUser) {
  Strategy.call(this);
  this._getUser = getUser
  this.name = 'username'
  this._passReqToCallback = false;
}

inherits(UsernameStrategy, Strategy)

UsernameStrategy.prototype.authenticate = function(req, options) {
  console.log('authenticating...')
  var self = this;

  if (req.headers.get('content-type') !== 'application/json') {
    return req.formData()
      .then((formData) => {
        const username = formData.get('username')
        console.log('logged in via formData username', formData, username)
  
        function verified(err, user, info) {
          if (err) { return self.error(err); }
          if (!user) { return self.fail(info); }
          self.success(user, info);
        }
  
        try {
          if (self._passReqToCallback) {
            self._getUser(req, username, verified);
          } else {
            self._getUser(username, verified);
          }
        } catch (ex) {
          return self.error(ex);
        }
  
      })
      .catch((err) => {
        self.error(err)
      })
  }

  req.json()
    .then((data) => {
      const username = data['username']
      console.log('logged in via json username', data, username)

      function verified(err, user, info) {
        if (err) { return self.error(err); }
        if (!user) { return self.fail(info); }
        self.success(user, info);
      }

      try {
        if (self._passReqToCallback) {
          self._getUser(req, username, verified);
        } else {
          self._getUser(username, verified);
        }
      } catch (ex) {
        return self.error(ex);
      }

    })
    .catch((err) => {
      self.error(err)
    })
};

export default UsernameStrategy
