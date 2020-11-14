// Why this file?
//  It exists primarily for unit testing

export const get = (key: string): string | null => {
  return localStorage.getItem(key)
}
export const set = (key: string, value: string): void => {
  return localStorage.setItem(key, value)
}
export const has = (key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(localStorage, key)
}
export const remove = (key: string): void => {
  return localStorage.removeItem(key)
}
