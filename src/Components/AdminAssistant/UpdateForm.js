import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import dashboardStyles from "./dashboard.module.css";
import axiosClient from "../../axiosClient";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

const UpdateForm = ({ formProduct, closeForm }) => {
  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pcategory: "",
    pdescription: "",
    pimgs: [],
  });
  const [err, setErr] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (formProduct) {
      setProduct({
        pname: formProduct.pname || "",
        pprice: formProduct.pprice || "",
        pcategory: formProduct.pcategory || "",
        pdescription: formProduct.pdescription || "",
        pimgs: formProduct.pimgs || [],
      });
    }
  }, [formProduct]);

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
              <MdProductionQuantityLimits size={200} color="#1f3835" />
            </div>
            <div className={logStyles.data}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <IoIosCloseCircleOutline
                  size={30}
                  cursor={"pointer"}
                  color="#1f3835"
                  onClick={closeForm} // Close function applied here
                />
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
