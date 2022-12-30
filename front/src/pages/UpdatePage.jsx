import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Axios from "../api/axios-client";

export default function UpdatePage() {
  const [info, setInfo] = useState({
    name: "",
    imageLink: "",
    count: 0,
    price: 0,
  });

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("/products/:id", { ...info });
    // await Axios.put(`/products/${parseInt(localStorage.getItem("lastClickedItem"))}`, { ...info });
    setInfo({ name: "", imageLink: "", count: 0, price: 0 });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          value={info.name}
          placeholder="Enter name"
          name="name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImageLink">
        <Form.Label>Image link</Form.Label>
        <Form.Control
          type="text"
          value={info.imageLink}
          placeholder="Image link"
          onChange={handleChange}
          name="imageLink"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCount">
        <Form.Label>Count</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          value={info.count}
          placeholder="Count"
          name="count"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="number"
          value={info.price}
          placeholder="Price"
          name="price"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Product
      </Button>
    </Form>
  );
}
