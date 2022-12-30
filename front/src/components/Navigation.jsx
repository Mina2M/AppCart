import { useEffect, useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../api/axios-client";
import { useAuth } from "../global/auth";
import { refresh } from "../utils/refresh";

export default function Navigation() {
  const [user, setUser] = useState(null);
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/auth/get_curr_user")
      .then((res) => {
        if (!res.data) return;
        Axios.get(`/users/${res.data.user_id}`).then((usr) => {
          setUser(usr.data);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = async () => {
    await Axios.post("/auth/logout").catch((err) => console.log(err));
    setLoggedIn(false);
    navigate("/login");
    await refresh();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Cart
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user && loggedIn ? (
            <>
              {user && user.type === 0 ? (
                <Link
                  to="/orders"
                  style={{ marginRight: "1rem", textDecoration: "none" }}
                >
                  my orders
                </Link>
              ) : null}
              {user && user.type === 1 ? (
                <Link
                  to="/admin_users"
                  style={{ marginRight: "1rem", textDecoration: "none" }}
                >
                  show users
                </Link>
              ) : null}
              <Link
                to="/cart"
                style={{ marginRight: "1rem", textDecoration: "none" }}
              >
                open cart
              </Link>
              <Navbar.Text style={{ marginRight: "1rem" }}>
                {user.email}
              </Navbar.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
