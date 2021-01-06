const { readLines } = require('../util.js');
const LINE = /\[(\d+-\d+-\d+ \d+:\d+)\] (.*)/;

const EVENTS = {
  'falls asleep': 1,
  'wakes up': 2,
  'shift switch': 3,
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parse(datestr, eventStr) {
  let date = new Date(datestr);
  let event = EVENTS[eventStr] || 3;
  let meta;
  if (event === 3) {
    // assert string
    assert(eventStr.startsWith('Guard #'), 'Invalid event');
    meta = parseInt(eventStr.slice('Guard #'.length).split(" ")[0]);
    assert(!isNaN(meta), 'Invalid guard id');
  }
  return {date, event, meta};
}

readLines('input')
  .then(lines => {
    events = lines.map(line => LINE.exec(line))
                  .map(l => parse(l[1], l[2]));
    // I assume there is no collision
    events.sort((a, b) => a.date < b.date ? -1 : 1);
    console.log(events);
    return events;
  })
  .then(events => {
    let currentGuard = undefined;
    let sleepTime = undefined;
    return events.reduce((log, event) => {
      switch (event.event) {
        case 1: // falls asleep
          assert(currentGuard, 'No guard is available to sleep');
          sleepTime = event.date;
          break;
        case 2: // wakes up
          assert(sleepTime, 'Who even slept?');
          log.push({
            guard: currentGuard,
            start: sleepTime.getMinutes(), 
            end: event.date.getMinutes()
          });
          sleepTime = undefined;
          break;
        case 3: // shift switch
          assert(!sleepTime, 'Guards cannot switch while sleeping');
          currentGuard = event.meta;
          break;
      }
      return log;
    }, []);
  }).then(log => {
    return log.reduce((map, entry) => {
      if (!map.has(entry.guard)) map.set(entry.guard, Array(60).fill(0));
      for (let t = entry.start; t < entry.end; t++) {
        map.get(entry.guard)[t]++;
      }
      return map;
    }, new Map())
  }).then(minutes => {
    let maxSleep = 0, maxMinute = 0, id = 0;
    for (let [guard, minute] of minutes) {
      let sleep = minute.reduce((acc, m) => acc + m, 0);
      if (sleep > maxSleep) {
        maxSleep = sleep;
        maxMinute = minute.reduce((acc, m, i) => acc.m < m ? {m, i} : acc, {m: 0, i: -1}).i
        id = guard;
      }
    }
    console.log(id * maxMinute);
  });
