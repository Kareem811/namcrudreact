import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import axiosClient from "../../axiosClient";
import { MdProductionQuantityLimits } from "react-icons/md";

const AddProduct = () => {
  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pcategory: "",
    pdescription: "",
    pimgs: [],
  });
  const [err, setErr] = useState(false);
  const [done, setDone] = useState(false);

  const handleFileChange = (files) => {
    setProduct({ ...product, pimgs: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pname", product.pname);
    formData.append("pprice", product.pprice);
    formData.append("pcategory", product.pcategory);
    formData.append("pdescription", product.pdescription);

    Array.from(product.pimgs).forEach((file) => {
      formData.append("pimgs[]", file);
    });

    try {
      const res = await axiosClient.post(`/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDone(true);
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className={logStyles.container}>
        {done && (
          <div
            onClick={() => {
              setDone(false);
            }}
            className={logStyles.success}>
            <div className={logStyles.message}>
              <h1>Product Added Successfully</h1>
              <button>Confirm</button>
            </div>
          </div>
        )}
        <div className={logStyles.content}>
          <div className={logStyles.data}>
            <MdProductionQuantityLimits size={200} color="#1f3835" />
          </div>
          <div className={logStyles.data}>
            <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
              <h1>Add Product</h1>
              <div className={logStyles.inputData}>
                <label htmlFor="pname">Product Name</label>
                <input type="text" id="pname" value={product.pname} onChange={(e) => setProduct({ ...product, pname: e.target.value })} />
              </div>
              <div className={logStyles.inputData}>
                <label htmlFor="pprice">Product Price</label>
                <input type="text" id="pprice" value={product.pprice} onChange={(e) => setProduct({ ...product, pprice: e.target.value })} />
              </div>
              <div className={logStyles.inputData}>
                <label htmlFor="pcategory">Product Category</label>
                <input type="text" id="pcategory" value={product.pcategory} onChange={(e) => setProduct({ ...product, pcategory: e.target.value })} />
              </div>
              <div className={logStyles.inputData}>
                <label htmlFor="pdescription">Product Description</label>
                <input type="text" id="pdescription" value={product.pdescription} onChange={(e) => setProduct({ ...product, pdescription: e.target.value })} />
              </div>
              <div className={logStyles.inputData}>
                <label htmlFor="image">Product Images</label>
                <input type="file" id="image" multiple onChange={(e) => handleFileChange(e.target.files)} />
              </div>
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
