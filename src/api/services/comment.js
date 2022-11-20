import axios from "../axios";
import { getFromLS, getFromSS } from "../../utils/storage";

const getComments = (id) => {
  return axios.get(`/comments/${id}`).then((res) => res.data);
};

const createComment = (data) => {
  return axios
    .post("/comments", {
      ...data,
      "meta.uid": getFromLS("uid", "val"),
      "meta.ip": getFromSS("ip", "val"),
    })
    .then((res) => res.data);
};

export { getComments, createComment };
