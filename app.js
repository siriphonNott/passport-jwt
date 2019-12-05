const express = require('express'),
      app = express(),
      passport = require('passport'),
      port = process.env.PORT || 3000

// Set Parses JSON 
app.use(express.json())

// Import passport
require('./configs/passport');

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/user',  passport.authenticate('jwt', {session: false}), require('./routes/user'))

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    }
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))