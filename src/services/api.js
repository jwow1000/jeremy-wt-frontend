// src/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_LOCAL_URL;
console.log("hodywd", import.meta.env.VITE_LOCAL_URL, BASE_URL)
const username = import.meta.env.VITE_LOGIN_NAME;
const password = import.meta.env.VITE_LOGIN_PASS;

// Base64-encode the credentials
const encodedCredentials = btoa(`${username}:${password}`);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Basic ${encodedCredentials}`,
  },
});

// // Add a request interceptor if you need to add tokens or custom headers
// api.interceptors.request.use(config => {
//   // Example: Add authorization headers
//   const token = localStorage.getItem("token"); 
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });


export default api;
