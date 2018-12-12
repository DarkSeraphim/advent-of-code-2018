import sys

def solve(gen):
  def first(line):
    if not line.startswith('initial state: '):
      raise RuntimeError('Wrong input')
    l = list(line[len('initial state: '):])
    del l[-1]
    return l
  
  def parse_transitions(lines):
    matchers = []
    for line in lines:
      input = line[0:5]
    #  print input
      output = line[-2]
      matchers.append((input, output))
    return matchers
  
  def get_state(state, j):
    if j < 0 or j >= len(state):
      return '.'
    return state[j]
  
  def matches(matcher, state, j):
    for i in range(len(matcher[0])):
      a = matcher[0][i]
      b = get_state(state, j + i - 2)
      if a != b:
        return False
    return True
  with open('input') as f:
    lines = f.readlines()
    padding = gen * 2
    state = (['.'] * padding) + first(lines[0]) + (['.'] * padding)
    transitions = parse_transitions(lines[2:])
  
    new_state = ['.'] * len(state)
    # print " 0:", ''.join(state)
    for i in range(1, gen + 1):
      offset = 0
      for j in range(len(state)):
        for transition in transitions:
          if matches(transition, state, j):
            new_state[j] = transition[1]
            break
        else:
          new_state[j] = '.'
          # raise RuntimeError('None matched? ' + str(j))
      #prefix = str(i)
      #prefix = " " * (2-len(prefix)) + prefix + ":"
      #print prefix, "".join(new_state)
      t = state
      state = new_state
      new_state = t
    
    result = 0
    first = -1
    last = -1
    for i in range(len(state)):
      if state[i] == '#':
        result += (i - padding)
        if first == -1:
          first = i
        last = i
  
    return (result, ''.join(state[first:last+1]))

a = 0
b = 0
i = 20
l = None
n = None
while True:
  l = solve(i)
  n = solve(i + 10)
  if n[1] == l[1]:
    break
  i += 10
sol = (l[0] + ((n[0] - l[0]) * ((50000000000 - i)/10)))
print sol
