// import React from "react";
// import "./App.css";
// import { Routes, Route, Router } from "react-router-dom";
// import Login from './Components/Log/Login'
// import Register from './Components/Log/Register'
// import ProtectedRoute from "./Components/Protected/ProtectedRoutes";
// import Dashboard from "./Components/Dashboard/Dashboard";
// function App() {
//   return (
//     <div className="App">
//       {/* <Routes>
//         <Route path={"/login"} element={<Login />} />
//         <Route path={"/register"} element={<Register />} />
//       </Routes> */}
//       {/* <Router> */}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       {/* </Router> */}
//     </div>
//   );
// }

// export default App;
// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Log/Login";
import Register from "./Components/Log/Register";
import Dashboard from "./Components/AdminAssistant/Dashboard";
import ProtectedRoute from "./Components/Protected/ProtectedRoutes";
import HomeCompnent from "./Components/Home/HomeCompnent";
import AddProduct from "./Components/AdminAssistant/AddProduct";
import ShowProducts from "./Components/AdminAssistant/ShowProducts";
import SingleProduct from "./Components/AdminAssistant/SingleProduct";
import UpdateForm from "./Components/AdminAssistant/UpdateForm";
import ShowUsers from "./Components/AdminAssistant/ShowUsers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/addproduct"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/showusers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ShowUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/showproducts"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ShowProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/showproducts/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SingleProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/update/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateForm />
            </ProtectedRoute>
          }
        />
        {/* ------------------------------------ */}
        <Route
          path="/assistant/dashboard"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant/dashboard/addproduct"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant/dashboard/showusers"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <ShowUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant/dashboard/showproducts"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <ShowProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant/dashboard/showproducts/:id"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <SingleProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant/dashboard/update/:id"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <UpdateForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <HomeCompnent />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>403 - Access Denied</div>} />
      </Routes>
    </div>
  );
}

export default App;
