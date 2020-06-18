const uniqueId = require('lodash/uniqueId');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function generatePrime(bits) {
    const { stdout, stderr } = await exec(`openssl prime -generate -bits ${bits}`);
    if (stderr) {
        throw new Error(stderr);
    }
    console.log({stdout})
    return parseInt(stdout)
}

function findR(p, q) {
    for(let r = 1; ; r++) {
        if (p == q * r + 1) {
            return r;
        }
    }
}

function findGenerator(p, r) {
    for(let h = 2; h < p; h++) {
        const generator = pow(h, r) % p;
        if (generator !== 1) {
            return generator;
        }
    }
    throw new Error("No such `h` exists.")
}

async function newGroup(question, n) {
    const id = uniqueId();
    const p = await generatePrime(64);
    const q = await generatePrime(16);
    // const r = findR(p, q);
    // const g = findGenerator(p, r);
    const g = 0;

    return {n, question, id, p, q, g}
}

module.exports = newGroup;
