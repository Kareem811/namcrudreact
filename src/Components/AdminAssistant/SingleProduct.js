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
        console.log(res.data);
        setLoading(false);
        setProduct(res.data);
        setImages(JSON.parse(res.data.images));
        console.log(JSON.parse(res.data.images));
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
            <img className={dashboardStyles.mainImg} src={`http://127.0.0.1:8000/storage/${images[0]}`} alt="" />
            <div className={dashboardStyles.productData}>
              <h2>{product.name}</h2>
              <h3>
                <b>Category:</b> {product.category}
              </h3>
              <p>{product.description}</p>
              <span>${product.price}</span>
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
