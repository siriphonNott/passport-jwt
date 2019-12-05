const router = require('express').Router(),
      jwt = require('jsonwebtoken'),
      passport = require('passport')

router.post('/login', ( req, res, next ) => {
  
  passport.authenticate('local', { session: false }, (err, user, info) => {
    
    if (err) return next(err)

    if(user) {
      const token = jwt.sign(user, 'your_jwt_secret')
      return res.json({user, token})
    } else {
      return res.status(422).json(info);
    }

  })(req, res, next)

})

module.exports = router