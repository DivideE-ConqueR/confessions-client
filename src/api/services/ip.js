/* eslint-disable no-undef */
import axios from "axios";

const isDev = import.meta.env?.DEV;

const getIP = async () => {
  const ip = await axios
    .get(
      `https://geolocation-db.com/json/${
        isDev
          ? import.meta.env.VITE_GEOLOCATION_API_KEY
          : process.env.REACT_APP_GEOLOCATION_API_KEY
      }`
    )
    .then((res) => res.data.IPv4)
    .catch((err) => console.error(`${err.code}: - ${err.message}`));
  return ip;
};

export { getIP };
