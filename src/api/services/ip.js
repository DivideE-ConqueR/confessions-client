import axios from "axios";

const getIP = async () => {
  const ip = await axios
    .get(
      `https://geolocation-db.com/json/${
        import.meta.env.VITE_GEOLOCATION_API_KEY
      }`
    )
    .then((res) => res.data.IPv4)
    .catch((err) => console.error(`${err.code}: - ${err.message}`));
  return ip;
};

export { getIP };
