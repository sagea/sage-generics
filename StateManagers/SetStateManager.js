// src/StateManagers/SetStateManager.ts
import {Event as Event2} from "../Event.js";
function SetStateManager(defaultState) {
  let state = defaultState;
  const changeEvent = Event2();
  const getState = () => state;
  const setState = (callback) => {
    state = callback(getState());
    changeEvent.emit();
  };
  return Object.freeze({
    getState,
    setState,
    onChange: changeEvent.on
  });
}
export {
  SetStateManager
};
