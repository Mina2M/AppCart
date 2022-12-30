const mssql = require('mssql');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { email, password, country } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await mssql.query(
      `INSERT INTO users (email, password, country) VALUES ('${email}', '${hashedPassword}', '${country}')`
    );
    res.status(201).json({ msg: 'user created successfully' });
  } catch (err) {
    res.status(500).json({ err: `error creating new user, ${err}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let exists = await mssql.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    exists = exists.recordset;
    if (!exists || (Array.isArray(exists) && exists.length === 0)) {
      return res.status(400).json({ err: 'user not found' });
    }
    const correctPassword = await bcrypt.compare(password, exists[0].password);
    if (!correctPassword) {
      return res.status(400).json({ err: 'incorrect password' });
    }
    req.session.user_id = exists[0].id;
    res.cookie('logged', JSON.stringify({ logged: true }), {
      httpOnly: false, // accessible by client side js
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: process.env.NODE_ENV === 'production', // secure only on prod
    });
    res.status(200).json({ msg: 'logged in successfully' });
  } catch (err) {
    res.status(500).json({ err: `error logging in, ${err}` });
  }
};

const getCurrUser = (req, res) => {
  if (req.session && req.session.user_id) {
    return res.json({ user_id: req.session.user_id });
  }
  res.json(null);
};

const logout = async (req, res) => {
  const error = await new Promise((resolve, reject) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          res.clearCookie('uid');
          res.clearCookie('logged');
          resolve(null);
        }
      });
    }
  });
  res.json({ err: error });
};

module.exports = {
  register,
  login,
  getCurrUser,
  logout,
};
