import { CallbackFunction } from './CallbackFunction.js'

export function Event<InvokeType>() {
  const callbacks = new Set<CallbackFunction<InvokeType>>();
  const on = (callback: CallbackFunction<InvokeType>): () => any => {
    if (typeof callback !== 'function') {
      console.error(`Event.on(callback) invalid parameter type provided. Expected a function but received`, callback);
      return () => {};
    }
    callbacks.add(callback)
    return () => off(callback);
  }
  const off = (callback: CallbackFunction<InvokeType>) => {
    if (typeof callback !== 'function') {
      return console.error(`Event.off(callback) invalid parameter type provided. Expected a function but received`, callback);
    }
    callbacks.delete(callback);
  }
  const emit = (...data: [InvokeType]) => {
    for (let callback of callbacks) {
      if (data.length) {
        callback(data[0])
      } else {
        callback();
      }
    }
  }
  const clear = () => {
    callbacks.clear()
  }
  return {
    get on() { return on },
    get off() { return off },
    get emit() { return emit },
    get clear() { return clear },
  }
}
