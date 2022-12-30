const mssql = require("mssql");

// READ
const getAll = async (req, res) => {
  try {
    const output = await mssql.query`SELECT * FROM products;`;
    const products = output.recordset;
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await mssql.query`SELECT * FROM products WHERE id = ${id};`;
    res.status(200).json(product.recordset[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

// CREATE
const createOne = async (req, res) => {
  try {
    const { name, imageLink, count, price } = req.body;
    await mssql.query`INSERT INTO products (name, img_link, count, price) VALUES (${name}, ${imageLink}, ${count}, ${price});`;
    res.status(201).json({ msg: "created product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

// UPDATE
const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imgLink, count } = req.body;
    await mssql.query`UPDATE products SET name=${name}, img_link=${imgLink}, count=${count} WHERE id = ${id};`;
    res.status(201).json({ msg: "updated product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.body;
    await mssql.query(`UPDATE products SET in_cart=${1} WHERE id = ${id};`);
    res.status(200).json({ msg: "added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: `can't add to cart ${err}` });
  }
};

const getProdsInCart = async (req, res) => {
  try {
    // const output = await mssql.query`SELECT * FROM products WHERE in_cart=1;`;
    const output = await mssql.query(`
      SELECT p.id, p.name, p.img_link, p.count, p.price, p.amount_in_cart, p.discount_id, d.precent
      FROM products as p
      LEFT JOIN discount as d on p.discount_id=d.id
      WHERE p.in_cart=1;
    `);
    const products = output.recordset;
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.body;
    await mssql.query(`UPDATE products SET in_cart=0 WHERE id = ${id};`);
    res.status(200).json({ msg: "removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

// DELETE
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await mssql.query(`DELETE FROM products WHERE id = ${id}`);
    res.status(200).json({ msg: "deleted product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const addDiscount = async (req, res) => {
  try {
    const { name, precent, product_id } = req.body;
    await mssql.query(
      `INSERT INTO discount (name, precent) VALUES ('${name}', ${precent})`
    );
    let disc_id = await mssql.query(
      `SELECT id FROM discount WHERE name='${name}'`
    );
    disc_id = disc_id.recordset[0].id;
    await mssql.query(
      `UPDATE products SET discount_id=${disc_id} WHERE id=${product_id}`
    );
    res.status(200).json({ msg: "added discount successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const productDiscounts = async (req, res) => {
  try {
    const { product_id } = req.params;
    let queryResult = await mssql.query(`
      SELECT d.precent FROM products AS p
      INNER JOIN discount AS d ON p.discount_id=d.id
      WHERE p.id=${product_id};
    `);
    queryResult = queryResult.recordset[0]
      ? queryResult.recordset[0].precent
      : 0;
    res.status(200).json(queryResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const productReviews = async (req, res) => {
  try {
    const { product_id } = req.params;
    let queryResult = await mssql.query(`
      SELECT r.body FROM reviews AS r
      INNER JOIN products AS p ON p.id=r.products_id
      WHERE p.id=${product_id};
    `);
    queryResult = queryResult.recordset;
    res.status(200).json(queryResult || []);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occurred", err });
  }
};

const addReview = async (req, res) => {
  try {
    const { id, body } = req.body;
    await mssql.query(`
      INSERT INTO reviews (body, products_id) VALUES ('${body}', ${id});
    `);
    res.status(200).json({ msg: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occured", err });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { user_id, name, total, phone, address, prod_ids } = req.body;
    await mssql.query(`
      INSERT INTO orders (name, total, phone, address, users_id) VALUES ('${name}', ${total}, '${phone}', '${address}', ${user_id});
    `);
    const order_id = (
      await mssql.query(`SELECT id FROM orders WHERE name='${name}'`)
    ).recordset[0].id;
    const updates = [];
    prod_ids.forEach((id) => {
      updates.push(
        mssql.query(`UPDATE products SET orders_id=${order_id} WHERE id=${id}`)
      );
    });
    await Promise.all(updates);
    res.status(200).json({ msg: "ok?" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occured", err });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    let result = await mssql.query(`
      SELECT name, total, phone, address
      FROM orders AS o
      INNER JOIN users AS u
      ON o.users_id=u.id
      WHERE u.id=${user_id};
    `);
    res.status(200).json(result.recordset || []);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occured", err });
  }
};

const getCountryAnalysis = async (req, res) => {
  try {
    const result = await mssql.query(
      // `CREATE VIEW [Countr Count] AS
      // SELECT country, COUNT(*) as count FROM users GROUP BY country;`
      `SELECT * FROM [Countr Count];`

      // `CREATE INDEX idx_country
      // ON users (country);`
    );
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err occured", err });
  }
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  addToCart,
  getProdsInCart,
  removeFromCart,
  addDiscount,
  productDiscounts,
  productReviews,
  addReview,
  placeOrder,
  getUserOrders,
  getCountryAnalysis,
};
