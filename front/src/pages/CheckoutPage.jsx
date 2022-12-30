import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "../api/axios-client";

export default function CheckoutPage() {
  const [user, setUser] = useState(null);

  const [info, setInfo] = useState({
    address: "",
    phone: "",
    name: "",
  });

  const [orderProductsIds, setOrderProductsIds] = useState([]);

  const getProds = async () => {
    const res = await Axios.post("/products/cart");
    setOrderProductsIds(res.data.map((pr) => pr.id));
  };

  const getUser = async () => {
    const res = await Axios.get("/auth/get_curr_user");
    setUser(res.data);
  };

  useEffect(() => {
    getProds();
    getUser();
  }, []);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user_id:", user.user_id);
    await Axios.post("/products/place_order", {
      user_id: user.user_id,
      total: parseFloat(localStorage.getItem("total")),
      prods_id: orderProductsIds,
      ...info,
    });
    setInfo({ address: "", phone: "", name: "" });
  };

  return (
    <div style={{ maxWidth: "35rem", marginInline: "auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>Order Details</h1>
      <Form method="POST" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            value={info.name}
            placeholder="Enter name"
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            value={info.address}
            placeholder="Enter address"
            name="address"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={info.phone}
            placeholder="Enter phone"
            onChange={handleChange}
            name="phone"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Place order
        </Button>
      </Form>
    </div>
  );
}
