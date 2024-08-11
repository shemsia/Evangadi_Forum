
import axios from "axios"
 const token = localStorage.getItem("token");
 const axiosConfig = axios.create({
   baseURL: "http://localhost:5000/api",
 });
const axiosBase = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export { axiosBase,axiosConfig };  