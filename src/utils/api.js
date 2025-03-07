import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/product", // 🔹 আপনার API URL দিন
});

export default API;
