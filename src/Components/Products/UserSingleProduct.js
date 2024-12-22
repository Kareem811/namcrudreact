import React, { useEffect, useState } from "react";
import productsStyles from "./products.module.css";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
const UserSingleProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axiosClient(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImages(JSON.parse(product.pimgs));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  });
  return (
    <>
      <Navbar />
      <section className={productsStyles.container}>
        {loading ? (
          <p>Loading ... </p>
        ) : (
          <>
            <h1>{product.pname}</h1>
            <div className={productsStyles.content}>
              <img src={images[0]} alt="" />
              <div className={productsStyles.productData}>
                <h2>{product.pname}</h2>
                <h4>{product.pcategory}</h4>
                <span>OMR {product.pprice}</span>
                <p>{product.pdescription}</p>
              </div>
            </div>
            <div className={productsStyles.images}>
              {images.map((el, idx) => (
                <img key={idx} src={el} alt="" />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default UserSingleProduct;
