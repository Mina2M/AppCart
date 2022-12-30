const session = require('express-session');

module.exports = session({
  name: 'uid',
  secret: 'session secret @!$!@',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // one week, then expires.
  },
});
