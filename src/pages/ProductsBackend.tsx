import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios";
import { Product } from "../models/product";
import { Filters } from "../models/filters";

function ProductsBackend() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1,
  });
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      // search / paginate / sort
      const arr = [];
      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }
      if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
      }
      if (filters.page) {
        arr.push(`page=${filters.page}`);
      }
      const response = await axios.get(`products/backend?${arr.join("&")}`);
      const data = response.data;
      if (filters.page === 1) {
        setProducts(data.data);
      } else {
        setProducts([...products, ...data.data]);
      }
      setLastPage(data.last_page);
    })();
  }, [filters]);

  return (
    <Layout>
      <Products
        products={products}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
      />
    </Layout>
  );
}

export default ProductsBackend;
