const fs = require('fs');
const readFile = file => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, str) => {
    if (err) reject(err);
    else resolve(str);
  });
});

const readLines = file => readFile(file)
   .then(str => str.trim().split("\n"));

const readTokens = (file, delimiter) => 
  readLines(file).then(lines => lines.flatMap(line => line.split(delimiter)));

const readElements = (file, delimiter, decoder) =>
  readLines(file).then(lines => lines.flatMap(line => line.split(delimiter)).map(decoder));

const readChars = (file, ignoreNewlines = true) => {
  return readFile(file).then(str => 
    [...str]
      .filter(c => !ignoreNewlines || c != '\n'));
}

module.exports = {
  readFile,
  readLines,
  readTokens,
  readElements,
  readChars,
};
