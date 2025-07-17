import axios from "axios";
import { METHODS } from "../constants";

const api = axios.create({
  baseURL: "https://admin-panel-lite-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const setHeaders = (key = "", value) => {
  api.defaults.headers[key] = value;
};

const client = ({
  method = METHODS.GET,
  url = "",
  withCredentials = false,
  auth,
  data,
  ...otherParams
}) => {
  return api({
    method,
    url,
    withCredentials,
    auth,
    data,
    ...otherParams,
  });
};

export default client;
