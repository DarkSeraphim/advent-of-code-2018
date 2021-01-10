const { readLines } = require('../util.js');

function manhattan(x, y, a, b) {
  return Math.abs(x - a) + Math.abs(y - b);
}

let regions = readLines()
  .map(line => line.split(', '))
  .map(([a, b]) => [parseInt(a), parseInt(b)])
  .reduce((regions, [x, y]) => {
    regions.push({x, y, id: regions.length});
    return regions;
  }, []);
let minX = regions
            .map(region => region.x)
            .reduce((acc, x) => 
                      Math.min(acc, x), 
                    Number.POSITIVE_INFINITY);
let maxX = regions
            .map(region => region.x)
            .reduce((acc, x) =>
                      Math.max(acc, x),
                    Number.NEGATIVE_INFINITY);
let minY = regions
            .map(region => region.y)
            .reduce((acc, y) =>
                      Math.min(acc, y),
                    Number.POSITIVE_INFINITY);
let maxY = regions
            .map(region => region.y)
            .reduce((acc, y) =>
                      Math.max(acc, y),
                    Number.NEGATIVE_INFINITY);
let offset = 10000 / regions.length;

let counter = 0;
for (let x = minX - offset; x <= maxX + offset; x++) {
  for (let y = minY - offset; y <= maxY + offset; y++) {
    let combined = regions.map(region => manhattan(x, y, region.x, region.y))
                          .reduce((a, b) => a + b, 0);
    if (combined < 10000) {
      counter++;
    }
  }
}

console.log(counter);
