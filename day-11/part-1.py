import sys
serial = int(sys.argv[1])

def compute(x, y):
  id = x + 10
  a = (id * y + serial) * id
  b = (a / 100) % 10
  return b - 5

offsets = [-1, 0, 1]
best = -1;
coords = None
for x in range(298):
  for y in range(298):
    x += 2
    y += 2
    val = 0
    for offx in offsets:
      for offy in offsets:
        val += compute(x + offx, y + offy)

    if val > best:
      best = val
      coords = (x - 1, y - 1)

print coords
