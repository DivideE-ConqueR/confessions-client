import axios from "axios";

const isDev = import.meta.env?.DEV;

const instance = axios.create({
  baseURL: `${
    isDev ? import.meta.env.VITE_API_URL : process.env.REACT_APP_API_URL
  }/api`,
});

export default instance;
