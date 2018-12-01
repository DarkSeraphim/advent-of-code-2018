const fs = require('fs');
fs.readFile('input', 'utf8', (err, str) => {
  if (err) throw err;
  console.log(str.split("\n")
     .filter(str => !!str)
     .map(str => parseInt(str))
     .reduce((acc, num) => acc + num, 0));
});
