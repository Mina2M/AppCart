const mssql = require('mssql');

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = (await mssql.query(`SELECT * FROM users WHERE id = ${id};`))
    .recordset[0];
  if (!user) {
    return res.status(400).json({ err: 'user not found' });
  }
  res.status(200).json(user);
};

module.exports = {
  getOne,
};
