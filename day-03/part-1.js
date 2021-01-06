const { readLines, readElements } = require('../util.js');

const LINE = /#(?<id>\d+) @ (?<offsetX>\d+),(?<offsetY>\d+): (?<width>\d+)x(?<height>\d+)/;

const points = new Map();
let count = 0;
let index = 0;
readElements(line => LINE.exec(line).groups)
     .map(({id, offsetX, offsetY, width, height}) => {
       offsetX = parseInt(offsetX);
       offsetY = parseInt(offsetY);
       width = parseInt(width);
       height = parseInt(height);
       for (let x = offsetX; x < offsetX + width; x++) {
         for (let y = offsetY; y < offsetY + height; y++) {
           const key = `${x}-${y}`;
           let vals = points.get(key);
           if (vals) {
            vals.push(id);
            if (vals.length === 2) count++; // Count IDs that occur twice
           } else {
            points.set(key, [id]);
           }
         }
       }
     });
console.log(count);
