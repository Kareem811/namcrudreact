import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import tableStyles from "./table.module.css";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import { AuthContext } from "../../Context/AuthContext";
const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  console.log(auth.role);
  useEffect(() => {
    axiosClient
      .get("/products")
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  }, []);
  const [formProduct, setFormProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const getForm = (x) => {
    setUpdate(true);
    setFormProducts(x);
  };
  const closeForm = () => {
    setUpdate(false);
  };
  const handleDelete = (delId) => {
    axiosClient
      .delete(`/products/${delId}`)
      .then((res) => {
        if (res.data.message === "Product deleted successfully") {
          setDone(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Navbar />
      <div className={tableStyles.container}>
        {update ? <UpdateForm formProduct={formProduct} closeForm={closeForm} /> : undefined}
        {done && (
          <div
            onClick={() => {
              setDone(false);
              closeForm();
            }}
            className={tableStyles.success}>
            <div className={tableStyles.message}>
              <h1>Deleted Successfully</h1>
              <button onClick={() => (window.location.href = `/${auth.role}/dashboard/showproducts`)}>Confirm</button>
            </div>
          </div>
        )}
        {loading ? (
          <p>Loading .... </p>
        ) : (
          <table>
            <thead>
              <tr key="1">
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Category</th>
                <th>Product Description</th>
                <th>Product Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.price}</td>
                  <td>{el.category}</td>
                  <td>{el.description}</td>
                  <td>
                    {el.images && typeof el.images === "string" ? (
                      <img src={`http://127.0.0.1:8000/storage/${JSON.parse(el.images)[0]}`} alt="Product Thumbnail" width="50" height="50" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td className={tableStyles.actions}>
                    <button onClick={() => handleDelete(el.id)}>Delete</button>
                    <button onClick={() => getForm(el)}>Update</button>
                    <Link to={`${el.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ShowProducts;
