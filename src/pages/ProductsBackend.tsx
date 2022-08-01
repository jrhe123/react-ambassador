import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios";
import { Product } from "../models/product";

function ProductsBackend() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("products/backend");
      const data = response.data;
      setProducts(data.data);
    })();
  }, []);

  return (
    <Layout>
      <Products products={products} />
    </Layout>
  );
}

export default ProductsBackend;
