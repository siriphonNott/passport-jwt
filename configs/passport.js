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

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    (jwtPayload, cb) => {

      try {
        // find the user in db if needed
        if(jwtPayload.id == user.id) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      } catch (error) {
        return cb(error, false);
      }
    }
));