export function safeParse<T extends { [id: string]: any }>(
  str: string | null,
): T | null {
  if (str === null) return null
  try {
    return JSON.parse(str)
  } catch (err) {
    return null
  }
}
