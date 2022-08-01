import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios";
import { Product } from "../models/product";
import { Filters } from "../models/filters";

function ProductsFrontend() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
  });

  useEffect(() => {
    (async () => {
      // all products
      const response = await axios.get("products/frontend");
      const data = response.data;
      setAllProducts(data);
      setFilteredProducts(data);
    })();
  }, []);

  useEffect(() => {
    let products = allProducts.filter((p) => {
      if (
        p.title.toLowerCase().indexOf(filters.s.toLowerCase()) !== -1 ||
        p.description.toLowerCase().indexOf(filters.s.toLowerCase()) !== -1
      ) {
        return p;
      }
      return null;
    });

    if (filters.sort === "asc") {
      products.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    } else if (filters.sort === "desc") {
      products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    }
    setFilteredProducts(products);
  }, [filters]);

  return (
    <Layout>
      <Products
        products={filteredProducts}
        filters={filters}
        setFilters={setFilters}
      />
    </Layout>
  );
}

export default ProductsFrontend;
