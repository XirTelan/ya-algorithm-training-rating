import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
  const { token } = useAuthStore.getState();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
