import axios from "axios";

const getIP = async () => {
  const ip = await axios
    .get(
      `https://geolocation-db.com/json/${process.env.REACT_APP_GEOLOCATION_API_KEY}`
    )
    .then((res) => res.data.IPv4);
  return ip;
};

export { getIP };
