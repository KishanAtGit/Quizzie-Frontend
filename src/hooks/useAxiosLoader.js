import { useEffect, useState } from "react";
import axios from "../axios.config";

const useAxiosLoader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const inc = mod => setCount(c => c + mod);
    let requestInterceptor;
    let responseInterceptor;

    const setupInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use(config => {
        inc(1);
        return config;
      });

      responseInterceptor = axios.interceptors.response.use(
        response => {
          inc(-1);
          return response;
        },
        error => {
          inc(-1);
          return Promise.reject(error);
        }
      );
    };

    const removeInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    setupInterceptors();

    return () => {
      removeInterceptors();
    };
  }, []);

  return count > 0;
};

export default useAxiosLoader;
