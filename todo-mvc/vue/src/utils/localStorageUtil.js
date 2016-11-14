const setItem = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const removeItem = function (key) {
  window.localStorage.removeItem(key)
}

const updateItem = function (key. value) {
  removeItem(key)
  setItem(key, value)
}

const getItem = function = (key) => {
  const valueJson = window.localStorage.getItem(key);
  if (valueJson) {
    return JSON.parse(valueJson);
  }

  return null;
}

export default {
  set: setItem,
  remove: removeItem,
  update: updateItem,
  get: gerItem
}