const { readLines } = require('../util.js');

const LINE = 'Step X must be finished before step ';

function getNode(map, id) {
  let node = map.get(id);
  if (!node) {
    map.set(id, node = {id, requirements:[], nodes: []});
  }
  return node;
}
const graph = readLines().map(line => {
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

let queue = [...graph.entries()]
              .filter(([id, node]) => !node.requirements.length)
              .map(([id, node]) => node);
queue.forEach(node => graph.delete(node.id));
let order = [];
while (queue.length) {
  queue.sort((a, b) => a.id < b.id ? -1 : 1);
  let node = queue.shift();
  order.push(node.id);
  node.nodes.forEach(other => {
    let onode = graph.get(other);
    onode.requirements.splice(onode.requirements.indexOf(node.id), 1);
    if (onode.requirements.length === 0) {
      graph.delete(other);
      queue.push(onode);
    }
  });
}
console.log(order.join(''));

