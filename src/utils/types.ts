export type Dictionary<T> = { [id: string]: T }

export function isObject(value: any): value is Dictionary<any> {
  if (!value) return false
  return typeof value === 'object'
}
export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}
