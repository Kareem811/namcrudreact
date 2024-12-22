import React, { useEffect, useState } from "react";
import productsStyles from "./products.module.css";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosClient
      .get(`/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <section className={productsStyles.container} style={{ marginTop: "100px" }}>
        {loading ? (
          <p>Loading .....</p>
        ) : (
          <>
            <h1>Products</h1>
            <div className={productsStyles.products}>
              {products.map((el) => (
                <div className={productsStyles.product} key={el.id}>
                  <h2>{el.pname}</h2>
                  <h3>{el.pcategory}</h3>
                  <p>{el.pdescription}</p>
                  <span>OMR {el.pprice}</span>
                  <Link to={`${el.id}`}>Read More</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductsComponent;
