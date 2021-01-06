const { readElements, parseInt, cycle } = require('../util.js');

let nums = readElements(parseInt);

const seen = new Set();
let freq = 0;
for (const next of cycle(nums)) {
  if (seen.has(freq)) {
    console.log(freq);
    break;
  }
  seen.add(freq);
  freq += next;
}
