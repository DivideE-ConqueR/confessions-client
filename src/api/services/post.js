import axios from "../axios";
import { getFromLS, getFromSS } from "../../utils/storage";

const getAllPosts = () => {
  return axios.get("/posts").then((res) => res.data);
};

const getPost = (id) => {
  return axios.get(`/posts/${id}`).then((res) => res.data);
};

const createPost = (data) => {
  return axios
    .post("/posts", {
      ...data,
      "meta.uid": getFromLS("uid", "val"),
      "meta.ip": getFromSS("ip", "val"),
    })
    .then((res) => res.data);
};

export { getAllPosts, getPost, createPost };
