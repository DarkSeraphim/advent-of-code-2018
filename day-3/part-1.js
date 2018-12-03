const { readLines } = require('../util.js');

const LINE = /#(?<id>\d+) @ (?<offsetX>\d+),(?<offsetY>\d+): (?<width>\d+)x(?<height>\d+)/;

const points = new Map();
let count = 0;
readLines('input').then(lines => {
  let index = 0;
  lines.map(line => LINE.exec(line).groups)
       .map(({id, offsetX, offsetY, width, height}) => {
         process.stdout.write(`\rIndex ${index} out of ${lines.length}`);
         index++;
         offsetX = parseInt(offsetX);
         offsetY = parseInt(offsetY);
         width = parseInt(width);
         height = parseInt(height);
         for (let x = offsetX; x < offsetX + width; x++) {
           for (let y = offsetY; y < offsetY + height; y++) {
             //process.stdout.write(`\r ${x} - ${y}`);
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
  console.log('\n',count);
});
