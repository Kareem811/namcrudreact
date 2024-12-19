import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
import dashboardStyles from "./dashboard.module.css";
const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/products/${id}`)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
        setImages(JSON.parse(res.data.pimgs));
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      <Navbar />
      {loading ? (
        <p>Loading .....</p>
      ) : (
        <section className={dashboardStyles.container}>
          <h1>{product.pname}</h1>
          <div className={dashboardStyles.product}>
            <img className={dashboardStyles.mainImg} src={images[0]} alt="" />
            <div className={dashboardStyles.productData}>
              <h2>{product.pname}</h2>
              <h3>
                <b>Category:</b> {product.pcategory}
              </h3>
              <p>{product.pdescription}</p>
              <span>${product.pprice}</span>
            </div>
          </div>
          <div className={dashboardStyles.productImages}>
            {images.map((el, idx) => (
              <img key={idx} src={el} alt="" />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SingleProduct;
