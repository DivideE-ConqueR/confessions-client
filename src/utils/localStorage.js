export function getPostLikesFromLS() {
  return JSON.parse(window.localStorage.getItem("postLikes")) || [];
}

export function setPostLikesToLS(postLikes) {
  window.localStorage.setItem("postLikes", JSON.stringify(postLikes));
}
