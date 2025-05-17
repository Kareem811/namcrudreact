import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import dashboardStyles from "./dashboard.module.css";
import axiosClient from "../../axiosClient";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UpdateForm = ({ formProduct, closeForm }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });
  const {auth} = useContext(AuthContext)
  const [err, setErr] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (formProduct) {
      setProduct({
        name: formProduct.name || "",
        price: formProduct.price || "",
        category: formProduct.category || "",
        description: formProduct.description || "",
        images: formProduct.images || [],
      });
    }
  }, [formProduct]);

  const handleFileChange = (files) => {
    setProduct({ ...product, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("description", product.description);
    if (product.images.length > 0 && product.images[0] instanceof File) {
      Array.from(product.images).forEach((file) => {
        formData.append("images[]", file);
      });
    }

    try {
      const res = await axiosClient.post(
        `/products/${formProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.data.message === "Product updated successfully") {
        setDone(true);
      }
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };
const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className={dashboardStyles.fixed}>
        <section className={logStyles.container}>
          {done && (
            <div
              onClick={() => {
                setDone(false);
                closeForm();
              }}
              className={logStyles.success}>
              <div className={logStyles.message}>
                <h1>Updated Successfully</h1>
                <button onClick={() => (window.location.href = `/${auth.role}/dashboard/showproducts`)}>Confirm</button>
              </div>
            </div>
          )}
          <div className={`${logStyles.content} ${dashboardStyles.updateForm}`}>
            <div className={logStyles.data}>
              <MdProductionQuantityLimits size={200} color="#1f3835" />
            </div>
            <div className={logStyles.data}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <IoIosCloseCircleOutline size={30} cursor={"pointer"} color="#1f3835" onClick={closeForm} />
                <h1>Update {formProduct.name}</h1>
                <div className={logStyles.inputData}>
                  <label htmlFor="name">Product Name</label>
                  <input type="text" id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                </div>
                <div className={logStyles.inputData}>
                  <label htmlFor="price">Product Price</label>
                  <input type="text" id="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </div>
                <div className={logStyles.inputData}>
                  <label htmlFor="category">Product Category</label>
                  <input type="text" id="category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                </div>
                <div className={logStyles.inputData}>
                  <label htmlFor="description">Product Description</label>
                  <input type="text" id="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                </div>
                <div className={logStyles.inputData}>
                  <label htmlFor="image">Product Images</label>
                  <input type="file" id="image" multiple onChange={(e) => handleFileChange(e.target.files)} />
                </div>
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateForm;
