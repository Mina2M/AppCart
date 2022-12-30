import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "../api/axios-client";

export default function AddDiscount() {
  const [productId, setProductId] = useState(null);

  const [info, setInfo] = useState({
    name: "",
    precent: 0,
  });

  useEffect(() => {
    setProductId(
      parseInt(JSON.parse(localStorage.getItem("lastClickedProduct")))
    );
  }, []);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("/products/discount", { ...info, product_id: productId });
    setInfo({ name: "", precent: 0 });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Discount name</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          value={info.name}
          placeholder="Enter name"
          name="name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrecent">
        <Form.Label>Precent</Form.Label>
        <Form.Control
          type="number"
          value={info.imageLink}
          placeholder="Precentage"
          onChange={handleChange}
          name="precent"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Discount
      </Button>
    </Form>
  );
}
