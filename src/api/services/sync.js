import axios from "../axios";

const syncLikes = async (ids) => {
  return await axios.post("/sync?t=post&v=likes", { ids });
};

const syncUnlikes = async (ids) => {
  return await axios.post("/sync?t=post&v=unlikes", { ids });
};

const syncDislikes = async (ids) => {
  return await axios.post("/sync?t=post&v=dislikes", { ids });
};

const syncUndislikes = async (ids) => {
  return await axios.post("/sync?t=post&v=undislikes", { ids });
};

const syncReports = async (ids) => {
  return await axios.post("/sync?t=post&v=reports", { ids });
};

export {
  syncLikes as syncLikesAPI,
  syncUnlikes as syncUnlikesAPI,
  syncDislikes as syncDislikesAPI,
  syncUndislikes as syncUndislikesAPI,
  syncReports as syncReportsAPI,
};
