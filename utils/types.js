// src/utils/types.ts
function isObject(value) {
  if (!value)
    return false;
  return typeof value === "object";
}
function isFunction(value) {
  return typeof value === "function";
}
export {
  isFunction,
  isObject
};
