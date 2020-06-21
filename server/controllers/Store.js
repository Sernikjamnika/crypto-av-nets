const Store = {};

function save(id, entry) {
  Store[id] = entry;
}

function get(id) {
  const element = Store[id];
  if (!element) {
    throw new Error(`Room ${id} doesn't exist.`);
  }
  return element;
}

function remove(id) {
    delete Store[id];
}

module.exports = { save, get, remove };
