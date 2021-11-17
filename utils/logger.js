// src/utils/logger.ts
var error = (...args) => {
  return console.error(...args);
};
var warn = (...args) => {
  return console.warn(...args);
};
export {
  error,
  warn
};
