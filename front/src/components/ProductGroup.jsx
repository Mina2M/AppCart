import Axios from "../api/axios-client";
import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductGroup() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const prods = await Axios.get("/products");
    setProducts(prods.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      className="d-flex justify-content-center flex-wrap"
      style={{ gap: "2rem" }}
    >
      {products.map(({ img_link, ...others }, idx) => (
        <Product
          key={idx}
          imgLink={img_link}
          fetchProducts={getProducts}
          {...others}
        />
      ))}
    </div>
  );
}
