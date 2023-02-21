import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/",
});

export default axiosInstance;
