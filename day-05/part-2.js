const { readChars, patchObject } = require('../util.js');

patchObject()

function doesCollapse(a, b) {
  return a !== b && a.toLowerCase() === b.toLowerCase();
}

const all = readChars();
[...'abcdefghijklmnopqrstuvwxyz'].reduce((best, f) => {
  let chars = all.filter(c => c.toLowerCase() !== f);
  for (let i = 0; i < chars.length; i++) {
    while ((i < chars.length - 1) && doesCollapse(chars[i], chars[i+1])) {
      chars.splice(i, 2);
      if (i > 0) {
        i--;
      }
    }
  }
  return Math.min(best, chars.length);
}, Number.POSITIVE_INFINITY).inspect();
