import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "../api/axios-client";

export default function OrdersPage() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const getUserId = async () => {
    const res = await Axios.get("/auth/get_curr_user");
    return res.data.user_id;
  };

  const getOrders = async (id) => {
    const res = await Axios.get(`/products/get_orders/${id}`);
    setOrders(res.data);
  };

  useEffect(() => {
    getUserId()
      .then((id) => {
        getOrders(id);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Col>
        {orders.map((ord, idx) => (
          <Fragment key={idx}>
            <Row>
              <h2>{ord.name}</h2>
              <span>{ord.total}</span>
              <span>{ord.phon}</span>
              <span>{ord.address}</span>
            </Row>
            <hr />
          </Fragment>
        ))}
      </Col>
    </Container>
  );
}
