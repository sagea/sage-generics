// src/Event.ts
import {
  error
} from "./utils/logger.js";
function Event() {
  const callbacks = new Set();
  const on = (callback) => {
    if (typeof callback !== "function") {
      error(`Event.on(callback) invalid parameter type provided. Expected a function but received`, callback);
      return () => {
      };
    }
    callbacks.add(callback);
    return () => off(callback);
  };
  const off = (callback) => {
    if (typeof callback !== "function") {
      return error(`Event.off(callback) invalid parameter type provided. Expected a function but received`, callback);
    }
    callbacks.delete(callback);
  };
  const emit = (...data) => {
    for (let callback of callbacks) {
      if (data.length) {
        callback(data[0]);
      } else {
        ;
        callback();
      }
    }
  };
  const clear = () => {
    callbacks.clear();
  };
  return Object.freeze({
    on,
    off,
    emit,
    clear
  });
}
export {
  Event
};
