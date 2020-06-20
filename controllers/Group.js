const uniqueId = require("lodash/uniqueId");
const uniq = require("lodash/uniq");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { gcd, isPrime, randomInt } = require("mathjs");

async function generatePrime(bits) {
  const { stdout, stderr } = await exec(
    `openssl prime -generate -bits ${bits}`
  );
  if (stderr) {
    throw new Error(stderr);
  }
  return parseInt(stdout);
}

async function findPrimePair(r) {
  for (let i = 0; i < 10000; i++) {
    const q = await generatePrime(8);
    const p = r * q + 1;
    if (isPrime(p)) {
      return { p, q };
    }
  }
  throw new Error("Cannot construct such a prime pair.");
}

function newCyclicMultiplicativeGroup(p) {
  const Zp = [];
  for (let a = 1; a < p; a++) {
    if (gcd(a, p) === 1) {
      Zp.push(a);
    }
  }
  return Zp;
}

function rthResiduesSubgroup(r, p) {
  const Zp = newCyclicMultiplicativeGroup(p);
  return uniq(Zp.map((h) => Math.pow(h, r) % p));
}

async function createGroup() {
  const r = 2;
  const { p, q } = await findPrimePair(r);
  const G = rthResiduesSubgroup(r, p);
  if(G.length !== q) {
    throw new Error(`Bad group order: ${G.length} !== ${q}.`);
  }
  return { p, q, r, G };
}

function randomGenerator(G) {
  const order = G.length;
  while (true) {
    const elementIndex = randomInt(0, order);
    const g = G[elementIndex];
    if (g !== 1) {
      return g;
    }
  }
}

async function newGroup(question, n) {
  const id = uniqueId();
  const { G, q } = await createGroup();
  const g = randomGenerator(G);
  return { n, question, id, q, G, g };
}

module.exports = newGroup;
