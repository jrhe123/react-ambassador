import React, { FC } from "react";
import { Filters } from "../models/filters";
import { Product } from "../models/product";

interface productsProps {
  products?: Product[];
  filters: Filters;
  setFilters?: (filters: Filters) => void;
  lastPage: number;
}

const Products: FC<productsProps> = ({
  products,
  filters,
  setFilters,
  lastPage,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (setFilters) {
      setFilters({
        ...filters,
        s: value,
        page: 1,
      });
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (setFilters) {
      setFilters({
        ...filters,
        sort: value,
        page: 1,
      });
    }
  };

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (setFilters) {
      setFilters({
        ...filters,
        page: filters.page + 1,
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
        <div className="input-group-append">
          <select className="form-select" onChange={handleSort}>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
          </select>
        </div>
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

      {filters.page !== lastPage && (
        <div className="d-flex justify-content-center mt-4">
          <button onClick={handleLoadMore} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Products;
