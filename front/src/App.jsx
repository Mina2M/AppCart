import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddProduct from "./pages/AddProduct";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import authOnly from "./utils/authOnly";
import noAuthOnly from "./utils/noAuthOnly";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddDiscount from "./pages/Discount";
import ReviewPage from "./pages/ReviewPage";
import OrdersPage from "./pages/OrdersPage";
import AdminUsers from "./pages/AdminUsers";
import UpdatePage from "./pages/UpdatePage";

export default function App() {
  return (
    <>
      <Navigation />
      <Container className="py-5">
        <Routes>
          {authOnly(<Route path="/" element={<HomePage />} />)}
          {authOnly(<Route path="/add_product" element={<AddProduct />} />)}
          {authOnly(<Route path="/cart" element={<CartPage />} />)}
          {noAuthOnly(<Route path="/login" element={<Login />} />)}
          {noAuthOnly(<Route path="/register" element={<Register />} />)}
          {authOnly(<Route path="/checkout" element={<CheckoutPage />} />)}
          {authOnly(<Route path="/discount" element={<AddDiscount />} />)}
          {authOnly(<Route path="/review" element={<ReviewPage />} />)}
          {authOnly(<Route path="/orders" element={<OrdersPage />} />)}
          {authOnly(<Route path="/admin_users" element={<AdminUsers />} />)}
          {authOnly(<Route path="/update_product" element={<UpdatePage />} />)}
        </Routes>
      </Container>
    </>
  );
}
