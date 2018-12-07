const { readLines } = require('../util.js');

const LINE = 'Step X must be finished before step ';

function getNode(map, id) {
  let node = map.get(id);
  if (!node) {
    map.set(id, node = {id, requirements:[], nodes: []});
  }
  return node;
}

function tickWorkers(workers) {
  return workers.filter(worker => {
    return ++worker.time >= worker.end;
  })
}

readLines('input')
  .then(lines => {
    return lines.map(line => {
      let requirement = line.slice('Step '.length)[0];
      let node = line.slice(LINE.length)[0];
      return {requirement, node};
    }).reduce((graph, edge) => {
      let r = getNode(graph, edge.requirement);
      let n = getNode(graph, edge.node);
      n.requirements.push(r.id);
      r.nodes.push(n.id);
      return graph;
    }, new Map());
  }).then(graph => {
    let queue = [...graph.entries()]
                  .filter(([id, node]) => !node.requirements.length)
                  .map(([id, node]) => node);
    queue.forEach(node => graph.delete(node.id));
    let sleep = new Map([..."abcdefghijklmnopqrstuvwxyz"]
                  .map((c, i) => [c.toUpperCase(), i + 61]));
    let workers = Array(5).fill(0).map(_ => ({time: 0, end: 0}))
    let counter = 0;
    while (true) {
      let available = tickWorkers(workers);
      available.filter(a => a.work).forEach(a => {
        let node = a.work;
        node.nodes.forEach(other => { 
          let onode = graph.get(other); 
          onode.requirements.splice(onode.requirements.indexOf(node.id), 1); 
          if (onode.requirements.length === 0) { 
            graph.delete(other); 
            queue.push(onode); 
          }
        });
        a.work = undefined;
      });

      queue.sort((a, b) => a.id < b.id ? -1 : 1);
      available.forEach(worker => {
        let node = queue.shift();
        if (!node) return;
        worker.work = node;
        worker.time = 0;
        worker.end = sleep.get(node.id); 
      });

      if (!workers.some(worker => worker.work)) break;
      counter++;
    }
    console.log(counter);
  });
