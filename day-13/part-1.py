import sys

class Cart:
  def __init__(self, i, x, y, c):
    self.id = i
    self.x = x
    self.y = y
    self.memory = 0
    if c == '>':
      self.dx = 1
      self.dy = 0
    elif c == '<':
      self.dx = -1
      self.dy = 0
    elif c == '^':
      self.dx = 0
      self.dy = -1
    elif c == 'v':
      self.dx = 0
      self.dy = 1
    else:
      raise RuntimeError('Invalid cart')

  def coord(self):
    return (self.x, self.y)

  def tick(self):
    self.x += self.dx
    self.y += self.dy
  
  def cross(self):
    if self.memory % 3 == 0:
      self.turn()
    # if 1, go straight
    elif self.memory % 3 == 2:
      self.turn(True)
    self.memory += 1

  def turn(self, right=False):
    mod = 1
    if right:
      mod = -1
    if self.dx == 0:
      self.dx = mod * self.dy
      self.dy = 0
    elif self.dy == 0:
      self.dy = -mod * self.dx
      self.dx = 0
    else:
      raise RuntimeError('Invalid direction?')


lines = sys.stdin.readlines()
rails = {}
carts = []
locations = set()
for y in range(len(lines)):
  for x in range(len(lines[y])):
    coord = (x, y)
    c = lines[y][x]
    if c == '>' or c == '<' or c == '^' or c == 'v':
      carts.append(Cart(len(carts), x, y, c))
      if c == '>' or c == '<':
        c = '-'
      else:
        c = '|'
      locations.add(coord)

    rails[coord] = c
do_run = True
it = 1
while do_run:
  # print "Iteration", it
  carts.sort(key=lambda cart: (cart.y, cart.x))
  for cart in carts:
    locations.remove(cart.coord())
    cart.tick()
    loc = cart.coord()
    if cart.id == 0:
      pass #print "Cart",cart.id,"moved to",loc,". Moving at",rails[loc]
    if loc in locations:
      print(loc)
      do_run = False
      break
    locations.add(loc)

    piece = rails[loc]
    if piece == '+':
      cart.cross()
    elif piece == '\\':
      if cart.dx == 0:
        cart.dx = cart.dy
        cart.dy = 0
      else:
        cart.dy = cart.dx
        cart.dx = 0
    elif piece == '/':
      if cart.dx == 0:
        cart.dx = -cart.dy
        cart.dy = 0
      else:
        cart.dy = -cart.dx
        cart.dx = 0

  it += 1
