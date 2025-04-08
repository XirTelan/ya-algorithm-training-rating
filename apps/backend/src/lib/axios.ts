import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

export default axiosInstance;
