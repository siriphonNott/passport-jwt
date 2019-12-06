const router = require('express').Router()
const auth = require('../configs/auth')

/* GET users listing. */
router.get('/',  auth.optional, (req, res, next) => {
  res.send('respond with a resource')
});

/* GET user profile. */
router.get('/profile', auth.required, (req, res, next)  => {
  res.send(req.payload)
});

module.exports = router