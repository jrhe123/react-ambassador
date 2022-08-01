import React, { FC } from "react";
import { Product } from "../models/product";

interface productsProps {
  products?: Product[];
}

const Products: FC<productsProps> = ({ products }) => {
  return (
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
  );
};

export default Products;
