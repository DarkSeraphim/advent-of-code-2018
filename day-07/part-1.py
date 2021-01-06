FIRST = len('Step ')
SECOND = len('Step C must be finished before step ')

class Node:
 def __init__(self, key):
   self.incoming = []
   self.outgoing = []
   self.key = key

 def __repr__(self):
   return self.key

 def __str__(self):
   return self.key

def getOrAdd(graph, key):
  if key not in graph:
    graph[key] = Node(key)
  return graph[key]

with open('input') as f:
  lines = f.readlines()
  pairs = map(lambda line: (line[FIRST], line[SECOND]), lines)
  graph = {}
  for (a, b) in pairs:
    nodeA = getOrAdd(graph, a)
    nodeB = getOrAdd(graph, b)
    nodeA.outgoing.append(b)
    nodeB.incoming.append(a)
  
  queue = filter(lambda node: len(node.incoming) == 0, graph.values())
  for node in queue:
    del graph[node.key]
  
  done = []
  while len(queue):
    queue.sort(key=lambda node: node.key)
    current = queue.pop(0)
    done.append(current.key)
    for out in current.outgoing:
      if out not in graph:
        continue
      other = graph[out]
      other.incoming.remove(current.key)
      if len(other.incoming) == 0:
        queue.append(other)
        del graph[out]
  print "".join(done)
