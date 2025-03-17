// {
//     "author": "JyotiRanjanGhibila"
// }

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isTokenExpired = false;

const interceptorsSetup = (navigate) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('token')); 
      if (token) {
        config.headers.token = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        const errorMsg = error?.response?.data?.message;

        if (errorMsg === "Token has expired." || errorMsg === "Unauthorized") {
          sessionStorage.clear();
          localStorage.clear();
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          isTokenExpired = true;
          navigate("/login");
        }
      }
      return Promise.reject(error);
    }
  );
};

export { axiosInstance, isTokenExpired, interceptorsSetup };
