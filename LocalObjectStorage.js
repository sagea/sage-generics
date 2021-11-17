// src/LocalObjectStorage.ts
import {safeParse} from "./utils/json.js";
import {
  get,
  remove,
  set
} from "./localStorage.js";
import {SageGenericsType} from "./symbols.js";
import {isFunction, isObject} from "./utils/types.js";
import {
  warn
} from "./utils/logger.js";
function KEY(key) {
  return `SAGE-GENERICS-LOCAL-OBJECT-STORAGE.${key}`;
}
function LocalObjectStorage(storageKey, defaultState) {
  const key = KEY(storageKey);
  const format = (storage) => JSON.stringify(storage);
  const parse = (raw) => safeParse(raw) ?? defaultState;
  const get2 = () => {
    return parse(get(key) || "");
  };
  const set2 = (value) => {
    if (!isObject(value) && !isFunction(value)) {
      warn(`LocalObjectStorage.set(key, value) Expected value to be an object or a function`);
      return;
    }
    const nextValue = isFunction(value) ? value(get2()) : value;
    set(key, format(nextValue));
  };
  const clear = () => {
    remove(key);
  };
  return Object.freeze({
    [SageGenericsType]: LocalObjectStorage.name,
    key,
    get: get2,
    set: set2,
    clear
  });
}
export {
  LocalObjectStorage
};
