import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://quizzie-backend-lhsz.onrender.com/api/",
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
