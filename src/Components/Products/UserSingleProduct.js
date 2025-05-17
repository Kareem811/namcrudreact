import React, { useEffect, useState } from "react";
import productsStyles from "./products.module.css";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const UserSingleProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axiosClient(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImages(JSON.parse(res.data.images));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);
  return (
    <>
      <Navbar />
      <section className={productsStyles.container}>
        {loading ? (
          <p>Loading ... </p>
        ) : (
          <>
            <h1>{product.name}</h1>
            <div className={productsStyles.content}>
              <img src={`http://127.0.0.1:8000/storage/${images[0]}`} alt="" />
              <div className={productsStyles.productData}>
                <h2>{product.name}</h2>
                <h4>{product.category}</h4>
                <span>OMR {product.price}</span>
                <p>{product.description}</p>
              </div>
            </div>
            <div className={productsStyles.images}>
              {images.map((el, idx) => (
                <img key={idx} src={`http://127.0.0.1:8000/storage/${el}`} alt="" />
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default UserSingleProduct;
