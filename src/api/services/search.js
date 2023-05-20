import axios from "../axios";

const getSearchResults = async (query) => {
  return await axios.get(`/search/?q=${query}`).then((res) => res.data);
};

export { getSearchResults };
