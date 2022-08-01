import axios from "axios";
import React, { FC, useState } from "react";
import { Filters } from "../models/filters";
import { Product } from "../models/product";

interface productsProps {
  products?: Product[];
  filters: Filters;
  setFilters?: (filters: Filters) => void;
  lastPage: number;
}

interface notifyProps {
  show: boolean;
  error: boolean;
  message: string;
}

const Products: FC<productsProps> = ({
  products,
  filters,
  setFilters,
  lastPage,
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [notify, setNotify] = useState<notifyProps>({
    show: false,
    error: false,
    message: "",
  });

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

  const handleSelectProduct = (id: number) => {
    // hide message
    setNotify({
      ...notify,
      show: false,
    });
    //
    if (selected.some((s) => s === id)) {
      // remove
      setSelected(selected.filter((s) => s !== id));
    } else {
      // all
      setSelected([...selected, id]);
    }
  };

  const handleGenerateLink = async () => {
    try {
      const response = await axios.post("links", {
        products: selected,
      });
      const { data } = response;
      setNotify({
        show: true,
        error: false,
        message: `Link generated: http://localhost:5000/${data.code}`,
      });
    } catch (error) {
      console.error(error);
      setNotify({
        show: true,
        error: true,
        message: `You should be logged in to generate a link!`,
      });
    }
  };

  let info;
  if (notify.show) {
    info = (
      <div className="col-md-12 mb-4">
        <div
          role={"alert"}
          className={notify.error ? "alert alert-danger" : "alert alert-info"}
        >
          {notify.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* alert */}
      {info}
      {/* end of alert */}
      <div className="col-md-12 mb-4 input-group">
        <input
          onKeyUp={handleSearch}
          type="text"
          className="form-control"
          placeholder="Search"
        />
        {selected.length ? (
          <div className="input-group-append">
            <button className="btn btn-info" onClick={handleGenerateLink}>
              Generate Link
            </button>
          </div>
        ) : null}
        <div className="input-group-append">
          <select className="form-select" onChange={handleSort}>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
          </select>
        </div>
      </div>
      <div className="row">
        {products?.map((product, index) => {
          const selectedStyle = selected.some((s) => s === product.id);
          return (
            <div
              className="col-md-4"
              key={index}
              onClick={() => handleSelectProduct(product.id)}
            >
              <div
                className={
                  selectedStyle
                    ? "card mb-4 box-shadow selected"
                    : "card mb-4 box-shadow"
                }
              >
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
