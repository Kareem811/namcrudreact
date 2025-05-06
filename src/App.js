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
import ProductsComponent from "./Components/Products/ProductsComponent";
import UserSingleProduct from "./Components/Products/UserSingleProduct";
import AboutComponent from "./Components/About/AboutComponent";
import ShowMessages from "./Components/AdminAssistant/ShowMessages";
import ForgetPassword from "./Components/Log/ForgetPassword";
import Profile from "./Components/Profile/Profile";
import Contact from "./Components/Contact/Contact";
import Booking from "./Components/Booking/Booking";
import ShowBookings from "./Components/AdminAssistant/ShowBookings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
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
        <Route
          path="/admin/dashboard/showmessages"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ShowMessages />
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
          path="/assistant/dashboard/showmessages"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <ShowMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant/dashboard/showbookings"
          element={
            <ProtectedRoute allowedRoles={["assistant"]}>
              <ShowBookings />
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
        <Route
          path="/contact"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <HomeCompnent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <AboutComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <ProductsComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserSingleProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "assistant"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>403 - Access Denied</div>} />
      </Routes>
    </div>
  );
}

export default App;
