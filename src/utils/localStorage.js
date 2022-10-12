export function postLikesGetter() {
  return JSON.parse(localStorage.getItem("postLikes")) || [];
}

export function postLikesSetter(postLikes) {
  localStorage.setItem("postLikes", JSON.stringify(postLikes));
}
