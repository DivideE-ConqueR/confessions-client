export function getFromLS(key) {
  return JSON.parse(window.localStorage.getItem(key)) || [];
}

export function setToLS(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
