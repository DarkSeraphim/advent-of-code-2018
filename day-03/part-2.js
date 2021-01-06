const { readElements } = require('../util.js');

const LINE = /#(?<id>\d+) @ (?<offsetX>\d+),(?<offsetY>\d+): (?<width>\d+)x(?<height>\d+)/;

class Square {
  constructor(id, a, b, c, d) {
    this.id = id;
    this.minX = a;
    this.minY = b;
    this.maxX = a + c - 1;
    this.maxY = b + d - 1;
  }

  overlaps(square) {
    let x = false, y = false;
    
    if (square.minX < this.minX) {
      x = square.maxX >= this.minX
    } else if (square.minX > this.minX) {
      x = this.maxX >= square.minX;
    } else {
      x = true;
    }

    if (!x) return false;

    if (square.minY < this.minY) {
      y = square.maxY >= this.minY
    } else if (square.minY > this.minY) {
      y = this.maxY >= square.minY;
    } else {
      y = true;
    }
    return y;
  }
}

let count = 0;
let index = 0;
let squares = [];
let unmatched = [];
readElements(line => LINE.exec(line).groups)
     .map(({id, offsetX, offsetY, width, height}) => {
       offsetX = parseInt(offsetX);
       offsetY = parseInt(offsetY);
       width = parseInt(width);
       height = parseInt(height);
       square = new Square(id, offsetX, offsetY, width, height);
       let o;
       if (o = squares.reduce((acc, s) => acc || square.overlaps(s), false)) {
        squares.push(square);
       }

       for (let i = unmatched.length - 1; i >= 0; i--) {
        let s = unmatched[i];
        if (square.overlaps(s)) {
         unmatched.splice(i, 1); // remove unmatched
         squares.push(s);
         o = true;
        }
       }

       if (!o) {
        unmatched.push(square);
       } else {
        squares.push(square);
       }
     });
if (unmatched.length !== 1) throw new Error('More overlaps found');
console.log(unmatched[0].id);
