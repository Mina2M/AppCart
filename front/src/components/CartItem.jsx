import { Card, Button, Badge } from "react-bootstrap";
import Axios from "../api/axios-client";

export default function CartItem({
  id,
  name,
  img_link,
  count,
  amount_in_cart,
  setItemsInCart,
  price,
  precent,
}) {
  const remove = async () => {
    await Axios.post("/products/cart_remove", { id }).catch((err) =>
      console.log(err)
    );
    setItemsInCart((prev) => prev.filter((item) => item.id !== id)); // refetch
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img_link} />
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
            <Badge variant="primary">{precent}%</Badge>
          </span>
        </Card.Title>
        <Card.Text>
          <span style={{ display: "block" }}>
            amount: {count} | in_cart: {amount_in_cart}
          </span>
          price:{" "}
          <span
            style={{
              textDecoration: !precent || precent === 0 ? "" : "line-through",
            }}
          >
            {price}
          </span>
          {precent && precent !== 0 && (
            <>
              <span style={{ marginLeft: "0.5rem" }}>
                {price - price * (precent / 100)}
              </span>
            </>
          )}
        </Card.Text>
        {/* <div style={{ marginBottom: "1rem" }}>
          <Button
            disabled={count <= 0}
            variant="primary"
            style={{ marginRight: "0.5rem" }}
          >
            +
          </Button>
          <Button disabled={count <= 0} variant="primary">
            -
          </Button>
        </div> */}
        <Button onClick={remove} variant="danger">
          Remove from cart
        </Button>
      </Card.Body>
    </Card>
  );
}
