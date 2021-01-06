const fs = require('fs');

function readStdin() {
  return fs.readFileSync(0, 'utf-8')
}

function readLines(delimiter = '\n')  {
  return readStdin().trim().split(delimiter)
}

function readTokens(delimiter) {
  if (!delimiter) {
    throw new Error('Falsy delimiter for readTokens');
  }
  return readLines().flatMap(line => line.split(delimiter))
}

function readElements(delimiter, decoder) {
  if (typeof delimiter === 'function') {
    decoder = delimiter;
    delimiter = null;
  }

  return (delimiter ? readTokens(delimiter) : readLines()).map(decoder);
}

function readChars(ignoreNewlines = true) {
  [...readStdin()]
    .filter(c => !ignoreNewlines || c !== '\n')
}

function* cycle(iterable) {
  while (true) {
    for (const next of iterable) {
      yield next;
    }
  }
}

function patchArray() {
  let oldSort = Array.prototype.sort;
  Array.prototype.sort = function(sorter) {
    oldSort.call(this, sorter);
    return this;
  };
}

function parseInt1(x) {
  return parseInt(x)
}

function inspect(x) {
  console.log(x)
  return x;
}

module.exports = {
  // Input
  readStdin,
  readLines,
  readTokens,
  readElements,
  readChars,

  // Utilities
  cycle,
  patchArray,

  // patches
  parseInt: parseInt1,

  // Debug helpers
  inspect,
};
