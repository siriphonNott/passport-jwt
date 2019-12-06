const passport      = require('passport'),
      passportJWT   = require("passport-jwt"),
      ExtractJWT    = passportJWT.ExtractJwt,
      JWTStrategy   = passportJWT.Strategy,
      LocalStrategy = require('passport-local').Strategy

// Mock Data
const user = {
  id: 1,
  sub: 'nottdev',
  email: 'nottdev@gmail.com'
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (email, password, cb) => {        

    //this one is typically a DB call.
    if (email !== user.email) 
      return cb(null, false, {message: 'Incorrect email or password.'})
            
    return cb(null, user, {message: 'Logged In Successfully'})
  }
));
