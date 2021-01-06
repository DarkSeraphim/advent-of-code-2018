const fs = require('fs');
const inspect = require('util').inspect;

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
  return [...readStdin()]
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

const INSPECT_OVERRIDE = Symbol('inspectOverride')

function patchObject() {
  Object.prototype.inspect = function () {
    let out;
    if (this[INSPECT_OVERRIDE]) {
      out = this[INSPECT_OVERRIDE]();
    } else {
      out = inspect(this);
    }
    console.log(out)
    return this;
  }

  let override = function () {
    return this.toString();
  };
  [String.prototype, Number.prototype]
    .forEach(proto => proto[INSPECT_OVERRIDE] = override);
}

function parseInt1(x) {
  return parseInt(x)
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

  // patches
  patchArray,
  patchObject,
  INSPECT_OVERRIDE,
  parseInt: parseInt1,

  // Debug helpers
  inspect: (x) => {console.log(x); return x},
};
