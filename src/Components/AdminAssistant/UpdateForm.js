import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import dashboardStyles from "./dashboard.module.css";
import axiosClient from "../../axiosClient";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

const UpdateForm = ({ formProduct, closeForm }) => {
  console.log(formProduct);
  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pcategory: "",
    pdescription: "",
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
    if (product.pimgs) {
      Array.from(product.pimgs).forEach((file) => {
        formData.append("pimgs[]", file);
      });
    }

    try {
      const res = await axiosClient.post(`/products/${formProduct.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.data.message === "Product updated successfully") {
        setDone(true);
      }
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };
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
                <button onClick={() => (window.location.href = "/admin/dashboard/showproducts")}>Confirm</button>
              </div>
            </div>
          )}
          <div className={`${logStyles.content} ${dashboardStyles.updateForm}`}>
            <div className={logStyles.data}>
              <MdProductionQuantityLimits size={200} color="darkred" />
            </div>
            <div className={logStyles.data}>
              <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                <IoIosCloseCircleOutline size={30} cursor={"pointer"} color="darkred" />
                <h1>Update {formProduct.pname}</h1>
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
