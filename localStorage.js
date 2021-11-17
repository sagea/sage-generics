// src/localStorage.ts
var get = (key) => {
  return localStorage.getItem(key);
};
var set = (key, value) => {
  return localStorage.setItem(key, value);
};
var has = (key) => {
  return Object.prototype.hasOwnProperty.call(localStorage, key);
};
var remove = (key) => {
  return localStorage.removeItem(key);
};
export {
  get,
  has,
  remove,
  set
};
