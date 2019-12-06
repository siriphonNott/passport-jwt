const router = require('express').Router()
const authen = require('./authen')

/* GET users listing. */
router.get('/',  authen.optional, (req, res, next) => {
  res.send('respond with a resource')
});

/* GET user profile. */
router.get('/profile', authen.required, (req, res, next)  => {
  res.send(req.payload)
});

module.exports = router