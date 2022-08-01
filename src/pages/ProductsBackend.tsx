import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios";
import { Product } from "../models/product";

function ProductsBackend() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    s: "",
  });

  useEffect(() => {
    (async () => {
      // search / paginate / sort
      const arr = [];
      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }
      const response = await axios.get(`products/backend?${arr.join("&")}`);
      const data = response.data;
      setProducts(data.data);
    })();
  }, [filters]);

  return (
    <Layout>
      <Products products={products} filters={filters} setFilters={setFilters} />
    </Layout>
  );
}

export default ProductsBackend;
