// src/utils/json.ts
function safeParse(str) {
  if (str === null)
    return null;
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
}
export {
  safeParse
};
