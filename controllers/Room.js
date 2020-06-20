const uniqueId = require("lodash/uniqueId");
const Store = require("./Store");
const Group = require("./Group");

async function create(n, question) {
  const id = uniqueId();
  const group = await Group.create();
  const publicKeys = []; // [g^{x_i}]
  return { id, group, n, question, publicKeys };
}

function join(id, pubKey) {
  const room = Store.get(id);
  if(!Number.isInteger(pubKey)) {
    throw new Error(`Invalid public key: ${pubKey}`);
  }
  if (Array.isArray(room.publicKeys) && room.publicKeys.length >= room.n) {
      throw new Error(`Room ${id} is full`);
  }
  room.publicKeys.push(pubKey);
  return room;
}

module.exports = { create, join };
