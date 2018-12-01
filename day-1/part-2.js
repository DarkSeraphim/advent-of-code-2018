const fs = require('fs');
fs.readFile('input', 'utf8', (err, str) => {
  if (err) throw err;
  let nums = str.split("\n")
     .filter(str => !!str)
     .map(str => parseInt(str));

  const seen = new Set();
  let freq = 0;
  while (true) {
    for (let i = 0; i < nums.length; i++) {
      if (seen.has(freq)) {
        console.log(freq);
        return;
      }
      seen.add(freq);
      freq += nums[i];
    }
  }
});
