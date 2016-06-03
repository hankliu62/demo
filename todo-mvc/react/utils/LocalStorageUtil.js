export const setItem = (key, value) => {
  const valueJson = JSON.stringify(value);
  window.localStorage.setItem(key, valueJson);
}

export const getItem = (key) => {
  let itemJson = window.localStorage.getItem(key);
  if (itemJson) {
    itemJson = JSON.parse(itemJson);
  }
  return itemJson;
}

export const updateItem = (key, value) => {
  window.localStorage.removeItem(key);
  const valueJson = JSON.stringify(value);
  window.localStorage.setItem(key, valueJson);
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
}
