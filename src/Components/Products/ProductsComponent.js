// import React, { useEffect, useState } from "react";
// import productsStyles from "./products.module.css";
// import axiosClient from "../../axiosClient";
// import Navbar from "../Navbar/Navbar";
// import { Link } from "react-router-dom";
// import Footer from "../Footer/Footer";
// const ProductsComponent = () => {
//   const [search, setSearch] = useState("");
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     fetchProducts(value);
//   };
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const fetchProducts = (searchValue = "") => {
//     setLoading(true);
//     axiosClient
//       .get(`/products`, {
//         params: { search: searchValue },
//       })
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     axiosClient
//       .get(`/products`)
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);
//   return (
//     <>
//       <Navbar />
//       <section className={productsStyles.container} style={{ marginTop: "100px" }}>
//         {loading ? (
//           <p>Loading .....</p>
//         ) : (
//           <>
//             <h1>Products</h1>
//             <div className={productsStyles.products}>
//               {products.map((el) => (
//                 <div className={productsStyles.product} key={el.id}>
//                   <img src={`http://127.0.0.1:8000/storage/${JSON.parse(el.images)[0]}`} alt="" />
//                   <h2>{el.name}</h2>
//                   <h3>{el.category}</h3>
//                   <p>{el.description}</p>
//                   <span>OMR {el.price}</span>
//                   <Link to={`${el.id}`}>Read More</Link>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default ProductsComponent;

import React, { useEffect, useState } from "react";
import productsStyles from "./products.module.css";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { IoIosSearch } from "react-icons/io";

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = (searchValue = "") => {
    setLoading(true);
    axiosClient
      .get(`/products`, {
        params: { search: searchValue },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts(value);
  };

  return (
    <>
      <Navbar />
      <section className={productsStyles.container} style={{ marginTop: "100px" }}>
        ,
        <div className={productsStyles.search}>
          <span>Search</span>
          <div className={productsStyles.iconLeft}>
            <IoIosSearch color="#1f3835" />
            <input type="text" placeholder="Search products..." value={search} onChange={handleSearchChange} className={productsStyles.searchInput} />
          </div>
        </div>
        {loading ? (
          <p>Loading .....</p>
        ) : (
          <>
            <h1>Products</h1>
            <div className={productsStyles.products}>
              {products.length > 0 ? (
                products.map((el) => (
                  <div className={productsStyles.product} key={el.id}>
                    <img src={`http://127.0.0.1:8000/storage/${JSON.parse(el.images)[0]}`} alt="" />
                    <h2>{el.name}</h2>
                    <h3>{el.category}</h3>
                    <p>{el.description}</p>
                    <span>OMR {el.price}</span>
                    <Link to={`${el.id}`}>Read More</Link>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProductsComponent;
