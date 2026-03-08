import axios from "axios";

export const userBaseUrl = axios.create({
  baseURL: "http://localhost:5000/user",
});

export const taskBaseUrl = axios.create({
  baseURL: "http://localhost:5000/task",
});

taskBaseUrl.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("userAuth");

    if (authToken) {
      const token = JSON.parse(authToken)?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.log("auth-log-err", error);
    return Promise.reject(error);
  }
);

taskBaseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userAuth");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);