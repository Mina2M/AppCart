const express = require("express");
const mssql = require("mssql");
const sqlConfig = require("./sql-config");
const productsRouter = require("./routes/products-router");
const cors = require("cors");
const authRouter = require("./routes/auth-router");
const sessionMiddleware = require("./middlewares/session");
const usersRouter = require("./routes/users-router");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

(async () => {
  //1) import mongoose

  //2)connect to db
  await mssql.connect(sqlConfig);

  // `mongoose
  //   .connect(
  //     "mongodb+srv://Epsilon:N5gyW8gZ7JIHlMNr@cluster0.g1ec48z.mongodb.net/?retryWrites=true&w=majority"
  //   )
  //   .then(() => {
  //     const sellerSchema = new mongoose.Schema({
  //       Name: String,
  //       NumOfStars: Number,
  //     });

  //     //4)create Model
  //     const Seller = mongoose.model("seller", sellerSchema);

  //     const deliveryShema = new mongoose.Schema({
  //       Cost: Number,
  //     });

  //     //4)create Model
  //     const Delivery = mongoose.model("delivery", delivery);

  //     (async () => {
  //       await Seller.create({ Name: "Ali" });
  //       const res = await Seller.find({});
  //       const res2 = await Delivery.find({});
  //       console.log(res);
  //       console.log(res2);
  //     })();
  //   });`

  // await mssql.query(`
  //   CREATE TABLE discount (
  //     id int  NOT NULL IDENTITY(1, 1),
  //     name varchar(255)  NOT NULL,
  //     precent float(24)  NOT NULL,
  //     CONSTRAINT discount_pk PRIMARY KEY  (id)
  //   );
  // `);

  // await mssql.query(`
  //   CREATE TABLE orders (
  //     id int  NOT NULL IDENTITY(1, 1),
  //     total int  NOT NULL,
  //     phone varchar(255)  NOT NULL,
  //     address text  NOT NULL,
  //     users_id int  NULL,
  //     CONSTRAINT orders_pk PRIMARY KEY  (id)
  //   );
  // `);

  // await mssql.query(`
  //   CREATE TABLE products (
  //     id int  NOT NULL IDENTITY(1, 1),
  //     name varchar(255)  NOT NULL,
  //     img_link text  NOT NULL,
  //     count int  NOT NULL,
  //     price float(24)  NOT NULL,
  //     in_cart int  NOT NULL DEFAULT 0,
  //     amount_in_cart int  NOT NULL DEFAULT 0,
  //     orders_id int  NULL,
  //     discount_id int  NULL,
  //     CONSTRAINT products_pk PRIMARY KEY  (id)
  //   );
  // `);

  // await mssql.query(`
  //   CREATE TABLE reviews (
  //     id int  NOT NULL IDENTITY(1, 1),
  //     body text  NOT NULL,
  //     products_id int  NULL,
  //     users_id int  NULL,
  //     CONSTRAINT reviews_pk PRIMARY KEY  (id)
  //   );
  // `);

  // await mssql.query(`
  //   CREATE TABLE users (
  //     id int  NOT NULL IDENTITY(1, 1),
  //     email varchar(255)  NOT NULL,
  //     password text  NOT NULL,
  //     type int  NOT NULL DEFAULT 0,
  //     country varchar(100)  NOT NULL,
  //     CONSTRAINT users_pk PRIMARY KEY  (id)
  //   );
  // `);

  // await mssql.query(`
  //   ALTER TABLE orders ADD CONSTRAINT orders_users
  //     FOREIGN KEY (users_id)
  //     REFERENCES users (id)
  //     ON DELETE  CASCADE
  //     ON UPDATE  CASCADE;
  // `);

  // await mssql.query(`
  //   ALTER TABLE products ADD CONSTRAINT products_discount
  //     FOREIGN KEY (discount_id)
  //     REFERENCES discount (id)
  //     ON DELETE  CASCADE
  //     ON UPDATE  CASCADE;
  // `);

  // await mssql.query(`
  //   ALTER TABLE products ADD CONSTRAINT products_orders
  //     FOREIGN KEY (orders_id)
  //     REFERENCES orders (id)
  //     ON DELETE  CASCADE
  //     ON UPDATE  CASCADE;
  // `);

  // await mssql.query(`
  //   ALTER TABLE reviews ADD CONSTRAINT reviews_products
  //     FOREIGN KEY (products_id)
  //     REFERENCES products (id)
  //     ON DELETE  CASCADE
  //     ON UPDATE  CASCADE;
  // `);

  // await mssql.query(`
  //   ALTER TABLE reviews ADD CONSTRAINT reviews_users
  //     FOREIGN KEY (users_id)
  //     REFERENCES users (id);
  // `);

  // await mssql.query(`
  //  CREATE TABLE deliveries (
  //    id int  NOT NULL,
  //    date date  NOT NULL,
  //    users_id int  NULL,
  //    CONSTRAINT deliveries_pk PRIMARY KEY  (id)
  //  );
  // `);

  //  await mssql.query(`
  //  CREATE TABLE seller (
  //    id int  NOT NULL,
  //    name varchar(255)  NOT NULL,
  //    CONSTRAINT seller_pk PRIMARY KEY  (id)
  //  );
  // `);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
})();
