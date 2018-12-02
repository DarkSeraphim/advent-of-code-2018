const { readLines } = require('../util.js');

readLines('input').then(lines => {
  let results = 
  lines.map(lines => [...lines])
       .map(chars => chars.reduce((map, c) => {
              return map.set(c, (map.get(c) || 0) + 1);
            }, new Map()))
       .map(counts => {
          let tt = {2:0, 3:0};
          for (let value of counts.values()) {
            if (value === 2) tt[2] = 1;
            if (value === 3) tt[3] = 1;
          }
          return tt;
       })
       .reduce((acc, tt) => {
        return {2: acc[2] + tt[2], 3: acc[3] + tt[3]};
       }, {2: 0, 3: 0});
  console.log(results[2] * results[3]);
});
