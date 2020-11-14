export let storage = new Map<string, string>()
export let get = (key: string) => storage.get(key)
export let set = (key: string, value: string) => storage.set(key, value)
export let remove = (key: string) => storage.delete(key)
export let has = (key: string) => storage.has(key)

beforeEach(() => {
  storage = new Map()
})
