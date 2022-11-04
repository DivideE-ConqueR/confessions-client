export function getFromLS(key, type = "arr") {
  const data = type === "arr" ? [] : "";
  return JSON.parse(window.localStorage.getItem(key)) || data;
}

export function setToLS(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
