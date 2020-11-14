import { CallbackFunction } from './CallbackFunction'
import * as logger from './utils/logger'

export function Event<InvokeType = void>() {
  const callbacks = new Set<CallbackFunction<InvokeType>>()
  const on = (callback: CallbackFunction<InvokeType>): (() => any) => {
    if (typeof callback !== 'function') {
      logger.error(
        `Event.on(callback) invalid parameter type provided. Expected a function but received`,
        callback,
      )
      return () => {}
    }
    callbacks.add(callback)
    return () => off(callback)
  }
  const off = (callback: CallbackFunction<InvokeType>) => {
    if (typeof callback !== 'function') {
      return logger.error(
        `Event.off(callback) invalid parameter type provided. Expected a function but received`,
        callback,
      )
    }
    callbacks.delete(callback)
  }
  const emit = (...data: [InvokeType]) => {
    for (let callback of callbacks) {
      if (data.length) {
        callback(data[0])
      } else {
        ;(callback as any)()
      }
    }
  }
  const clear = () => {
    callbacks.clear()
  }
  return Object.freeze({
    on,
    off,
    emit,
    clear,
  })
}
