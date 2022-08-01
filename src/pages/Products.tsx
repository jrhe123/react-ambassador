import React, { FC } from "react";
import { Filters } from "../models/filters";
import { Product } from "../models/product";

interface productsProps {
  products?: Product[];
  filters?: Filters;
  setFilters?: (filters: Filters) => void;
}

const Products: FC<productsProps> = ({ products, filters, setFilters }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (setFilters) {
      setFilters({
        s: value,
      });
    }
  };

  return (
    <>
      <div className="col-md-12 mb-4 input-group">
        <input
          onKeyUp={handleSearch}
          type="text"
          className="form-control"
          placeholder="Search"
        />
      </div>
      <div className="row">
        {products?.map((product, index) => {
          return (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={product.image}
                  alt={product.description}
                  height={200}
                />
                <div className="card-body">
                  <p className="card-text">{product.title}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">${product.price}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
