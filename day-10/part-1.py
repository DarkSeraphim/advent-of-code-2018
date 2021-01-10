import re
import numpy as np
from PIL import Image
import sys

p = re.compile('position=< *(-?\d+), *(-?\d+)> velocity=< *(-?\d+), *(-?\d+)>')

class Point:
  def __init__(self, x, y, dx, dy):
    self.x = x
    self.y = y
    self.dx = dx
    self.dy = dy

  def step(self, n=1):
    self.x += n*self.dx
    self.y += n*self.dy


points = []
for line in sys.stdin.readlines():
  m = p.match(line)
  if not m:
    raise Error('Line {line} did not match :o'.format(line=line))
  x = int(m.group(1))
  y = int(m.group(2))
  dx = int(m.group(3))
  dy = int(m.group(4))
  points.append(Point(x,y,dx,dy))

steps = int(sys.argv[1])
for point in points:
  point.step(steps)

x = [point.x for point in points]
y = [point.y for point in points]
minx = min(x)
miny = min(y)
maxx = max(x)
maxy = max(y)
width = maxx - minx
height = maxy - miny
offx = 2
offy = 2
width += offx
height += offy

data = np.zeros((width, height, 3), dtype=np.uint8)

for point in points:
  x = point.x - minx - 1 + offx // 2
  y = point.y - miny - 1 + offy // 2
  data[x,y] = [255,255,255]

img = Image.fromarray(data)
img.save('solution.png', "PNG")

