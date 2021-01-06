const { readChars } = require('../util.js');

function doesCollapse(a, b) {
  return a !== b && a.toLowerCase() === b.toLowerCase();
}

const chars = readChars()
for (let i = 0; i < chars.length; i++) {
  while ((i < chars.length - 1) && doesCollapse(chars[i], chars[i+1])) {
    chars.splice(i, 2);
    if (i > 0) {
      i--;
    }
  }
}
console.log(chars.length);
