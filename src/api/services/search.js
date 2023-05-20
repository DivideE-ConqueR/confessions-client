import axios from "../axios";

const getSearchResults = (parem) => {
  return axios.get(`/search/?q=${parem}`).then((res) => res.data);
};

export { getSearchResults };
