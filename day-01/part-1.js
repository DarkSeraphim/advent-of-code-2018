const {readElements, inspect, parseInt} = require('../util.js')

console.log(readElements(parseInt)
  .reduce((acc, num) => acc + num, 0));
