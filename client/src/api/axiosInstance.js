import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL, // URL base tomada de las variables de entorno
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir automáticamente el token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
