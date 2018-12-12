import sys
serial = int(sys.argv[1])

compute_cache = {}

def compute(x, y):
  if (x, y) not in compute_cache:
    compute_cache[(x, y)] = compute2(x, y)
  return compute_cache[(x, y)]

def compute2(x, y):
  id = x + 10
  a = (id * y + serial) * id
  b = (a / 100) % 10
  return b - 5

def get_offset(n):
  return range(n)
best = -1;

"""
for x in range(300):
  for y in range(300):
    x += 1
    y += 1
    ans = str(compute(x, y))
    ans = ' '*(3 - len(ans)) + ans
    sys.stdout.write(ans)
  sys.stdout.write('\n')
sys.stdout.flush()"""

def compute_layer(x, y, size):
  res = 0
  for dx in range(size):
    res += compute(x + dx, y + size - 1)
  for dy in range(size - 1):
    res += compute(x + size - 1, dy + y)
  return res

coords = None
for x in range(300 - 2):
  sys.stdout.write('\r{i}'.format(i=x))
  sys.stdout.flush()
  for y in range(300 - 2):
    x += 1
    y += 1
    val = compute(x, y) + compute_layer(x, y, 2)
    for size in range(3, 301):
      if x + size > 300:
        break
      val += compute_layer(x, y, size)
      if val > best:
        best = val
        coords = (x, y, size)

print coords
