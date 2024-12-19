// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = window.sessionStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response) {
//       console.error("Response error:", error.response.data);
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//     } else {
//       console.error("Request setup error:", error.message);
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // your backend API URL
  withCredentials: true, // To handle cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header before each request
axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken"); // Retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosClient;
