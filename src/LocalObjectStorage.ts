import { safeParse } from './utils/json'
import * as localStorage from './localStorage'
import { SageGenericsType } from './symbols'
import { Dictionary, isFunction, isObject } from './utils/types'
import * as logger from './utils/logger'

function KEY<T extends string>(key: T) {
  return `SAGE-GENERICS-LOCAL-OBJECT-STORAGE.${key}` as const
}
export function LocalObjectStorage<
  StorageName extends string,
  T extends Dictionary<any>
>(storageKey: StorageName, defaultState: T) {
  const key = KEY(storageKey)
  const format = (storage: T): string => JSON.stringify(storage)
  const parse = (raw: string): T => safeParse<T>(raw) ?? defaultState

  const get = (): T => {
    return parse(localStorage.get(key) || '')
  }

  const set = (value: T | ((state: T) => T)) => {
    if (!isObject(value) && !isFunction(value)) {
      logger.warn(
        `LocalObjectStorage.set(key, value) Expected value to be an object or a function`,
      )
      return
    }
    const nextValue = isFunction(value) ? value(get()) : value
    localStorage.set(key, format(nextValue))
  }

  const clear = () => {
    localStorage.remove(key)
  }

  return Object.freeze({
    [SageGenericsType]: LocalObjectStorage.name,
    key,
    get,
    set,
    clear,
  })
}
