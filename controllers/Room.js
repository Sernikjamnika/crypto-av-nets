const uniqueId = require("lodash/uniqueId");
const Store = require("./Store");
const Group = require("./Group");

async function create(n, question) {
  const id = uniqueId();
  const group = await Group.create();
  const publicKeys = []; // [g^{x_i}]
  const answers = []; // [g^{c_i * y_i}]
  return { id, group, n, question, publicKeys, answers };
}

function join(id, pubKey) {
  const room = Store.get(id);
  if (!Number.isInteger(pubKey)) {
    throw new Error(`Invalid public key: ${pubKey}`);
  }
  if (Array.isArray(room.publicKeys) && room.publicKeys.length >= room.n) {
    throw new Error(`Room ${id} is full`);
  }
  room.publicKeys.push(pubKey);
  return room;
}

function vote(id, v) {
  const room = Store.get(id);
  if (!Number.isInteger(v)) {
    throw new Error(`Invalid vote: ${v}`);
  }
  if (Array.isArray(room.answers) && room.answers.length >= room.n) {
    throw new Error(`Everyone voted in room ${id}`);
  }
  room.answers.push(v);
  return room;
}

module.exports = { create, join, vote };
