import { Link } from 'react-router-dom';
import ProductGroup from '../components/ProductGroup';
import { useState, useEffect } from "react"
import Axios from '../api/axios-client';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get("/auth/get_curr_user").then(res => {
      Axios.get(`/users/${res.data.user_id}`).then(usr => setUser(usr.data));
    });
  }, []);

  return (
    <>
      <ProductGroup />
      {user && user.type === 1 ? <Link to="/add_product">Add Product</Link> : null}
    </>
  );
}
