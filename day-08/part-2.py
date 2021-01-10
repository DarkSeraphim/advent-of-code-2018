import sys

line = sys.stdin.readlines()[0]
numbers = list(map(lambda s: int(s), line.split(" ")))
def recurse(numbers):
  children = numbers[0]
  meta = numbers[1]
  offset = 2

  values = []
  for child in range(children):
    (r, o) = recurse(numbers[offset:])
    offset += o
    values.append(r)

  metanumbers = numbers[offset:offset+meta]
  result = 0
  if children == 0:
    result = sum(numbers[offset:offset+meta])
  else:
    for mn in metanumbers:
      if mn >= 1 and mn <= len(values):
        result += values[mn - 1]

  return (result, offset+meta)

print(recurse(numbers)[0])
