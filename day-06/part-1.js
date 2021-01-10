const { readLines, patchObject } = require('../util.js');

patchObject()

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
let spacesPerId = Array(regions.length).fill(0);
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    let minimums = [];
    let value = Number.POSITIVE_INFINITY;
    regions.forEach(region => {
      let dist = manhattan(x, y, region.x, region.y);
      if (dist <= value) {
        if (dist < value) {
          minimums = [];
        }
        minimums.push(region.id);
        value = dist;
      }
    });
    if (minimums.length === 1) {
      spacesPerId[minimums[0]]++;
    }
  }
}

minX--; maxX++; minY--; maxY++;
let biggerSpaces = spacesPerId.slice();
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    if ((x === minX || x === maxX) || (y === minY && y === maxY)) {
      let minimums = [];
      let value = Number.POSITIVE_INFINITY;
      regions.forEach(region => {
        let dist = manhattan(x, y, region.x, region.y);
        if (dist <= value) {
          if (dist < value) {
            minimums = [];
          }
          minimums.push(region.id);
          value = dist;
        }
      });
      if (minimums.length === 1) {
        biggerSpaces[minimums[0]]++;
      }
    }
  }
}

spacesPerId.filter((space, id) => {
  return biggerSpaces[id] === space;
}).reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY).inspect();

