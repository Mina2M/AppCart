import { useEffect, useMemo, useState } from "react";
import Axios from "../api/axios-client";
import CartItem from "../components/CartItem";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [itemsInCart, setItemsInCart] = useState([]);

  const getCartItems = async () => {
    try {
      const items = await Axios.post("/products/cart");
      setItemsInCart(items.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const total2 = useMemo(
    () =>
      itemsInCart.reduce(
        (acc, it) =>
          acc +
          (it.price -
            (it.precent && it.precent !== 0
              ? it.price * (it.precent / 100)
              : 0)),
        0
      ),
    [itemsInCart]
  );

  const setLocalStorageTotal = () =>
    localStorage.setItem("total", total2.toString());

  return (
    <>
      <div
        className="d-flex flex-wrap justify-content-center align-items-end"
        style={{ gap: "2rem" }}
      >
        {itemsInCart.map((item, idx) => (
          <CartItem key={idx} {...item} setItemsInCart={setItemsInCart} />
        ))}
        <span>Total: {total2}</span>
      </div>
      <Link to="/checkout">
        <Button variant="primary" onClick={setLocalStorageTotal}>
          Checkout
        </Button>
      </Link>
    </>
  );
}
