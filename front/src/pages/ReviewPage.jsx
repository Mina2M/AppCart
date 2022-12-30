import { Fragment } from "react";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Axios from "../api/axios-client";

export default function ReviewPage() {
  const [body, setBody] = useState("");
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    Axios.get(
      `/products/get_all_reviews/${parseInt(
        localStorage.getItem("lastClickedProduct")
      )}`
    )
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("/products/add_review", {
      id: parseInt(localStorage.getItem("lastClickedProduct")),
      body,
    });
    setBody("");
    fetchReviews();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Add review</Form.Label>
          <Form.Control
            onChange={(e) => setBody(e.target.value)}
            type="text"
            value={body}
            placeholder="Enter your opinion"
            name="name"
          />
        </Form.Group>
      </Form>
      <hr />
      <Col>
        <h1 style={{ marginBottom: "1rem" }}>Reviews</h1>
        {reviews.map((rev, idx) => (
          <Fragment key={idx}>
            <Row>
              <p>{rev.body}</p>
            </Row>
            <hr />
          </Fragment>
        ))}
      </Col>
    </Container>
  );
}
