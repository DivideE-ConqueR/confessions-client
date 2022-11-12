import axios from "../axios";

const getAllPosts = () => {
  return axios.get("/posts").then((res) => res.data);
};

const getPost = (id) => {
  return axios.get(`/posts/${id}`).then((res) => res.data);
};

export { getAllPosts };
