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

class Worker:
  def __init__(self):
    self.time = 0
    self.end = 0
    self.work = None

  def tick(self):
    self.time += 1
    return self.time >= self.end

  def set_work(self, node, end=0):
    self.work = node
    self.time = 0
    self.end = end

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
  
  workers = [Worker() for _ in range(5)]

  def process_node(current):
    for out in current.outgoing:
      if out not in graph:
        continue
      other = graph[out]
      other.incoming.remove(current.key)
      if len(other.incoming) == 0:
        queue.append(other)
        del graph[out]
 
  counter = 0
  while True: 
    available = filter(lambda worker: worker.tick(), workers)
    for a in available:
      if a.work:
        process_node(a.work)
        # Reset worker
        a.set_work(None)

    queue.sort(key=lambda node: node.key)
    for worker in available:
      if len(queue) == 0:
        break
      current = queue.pop(0)
      if current:
        worker.set_work(current, 61 + ord(current.key) - ord('A'))
    if len(filter(lambda worker: worker.work, workers)) == 0:
      break
    else:
      counter += 1
  print str(counter)
