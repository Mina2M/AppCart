import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import Axios from "../api/axios-client";

export default function Product({
  name,
  imgLink,
  count,
  id,
  price,
  fetchProducts,
}) {
  const [user, setUser] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    Axios.get("/auth/get_curr_user")
      .then((res) => {
        Axios.get(`/users/${res.data.user_id}`).then((usr) =>
          setUser(usr.data)
        );
      })
      .catch((err) => console.log(err));

    Axios.get(`/products/get_all_discounts/${id}`)
      .then((res) => setDiscount(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async () => {
    await Axios.post("/products/add_to_cart", { id });
    alert("Product added successfully");
  };

  const updateLS = () => {
    localStorage.setItem("lastClickedProduct", id.toString());
  };

  const removeProduct = async () => {
    try {
      await Axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgLink} />
      <Card.Body>
        <Card.Title
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <span>{name}</span>
          <span>
            <Badge variant="primary">{discount}%</Badge>
          </span>
        </Card.Title>
        <Card.Text>
          amount: {count} | price:{" "}
          <span
            style={{ textDecoration: discount === 0 ? "" : "line-through" }}
          >
            {price}
          </span>
          {discount !== 0 && (
            <>
              <span style={{ marginLeft: "0.5rem" }}>
                {price - price * (discount / 100)}
              </span>
            </>
          )}
        </Card.Text>
        <Button
          style={{ marginRight: "1rem" }}
          disabled={count <= 0}
          variant="primary"
          onClick={addToCart}
        >
          Add to cart
        </Button>
        {user && user.type === 1 ? (
          <Link to="/discount">
            <Button disabled={count <= 0} variant="success" onClick={updateLS}>
              Add discount
            </Button>
          </Link>
        ) : null}
        {user && user.type === 0 ? (
          <Link to="/review">
            <Button disabled={count <= 0} variant="warning" onClick={updateLS}>
              Add review
            </Button>
          </Link>
        ) : null}
        {user && user.type === 1 ? (
          <Button
            // disabled={count <= 0}
            variant="danger"
            onClick={removeProduct}
          >
            Remove product
          </Button>
        ) : null}
        

        {/* {user && user.type === 1 ? (
          <Link to="/update_product">
            <Button disabled={count <= 0} variant="success" onClick={removeProduct}>
              Update
            </Button>
          </Link>
        ) : null}          
         */}

      </Card.Body>
    </Card>
  );
}
