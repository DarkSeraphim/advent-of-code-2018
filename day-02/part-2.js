const { readLines } = require('../util.js');

const lines = readLines()
lines.forEach((lineA, indexA) => {
  lines.forEach((lineB, indexB) => {
    if (indexA === indexB) return;
    let diff = -1;
    for (let i = 0; i < lineA.length; i++) {
      if (lineA[i] !== lineB[i]) {
        if (diff !== -1) return; // More than one diff
        diff = i;
      }
    }
    let chars = [...lineA];
    chars.splice(diff, 1);
    console.log(chars.join(''));
  });
});
