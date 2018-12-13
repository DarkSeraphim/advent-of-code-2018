class Cart:
  def __init__(self, i, x, y, c):
    self.id = i
    self.x = x
    self.y = y
    self.memory = 0
    self.time = 0
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
    self.time += 1
  
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

  def __repr__(self):
    return '{id}@{x},{y}'.format(id=self.id,x=self.x,y=self.y)

with open('input') as f:
  lines = f.readlines()
  rails = {}
  carts = []
  locations = {}
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
        locations[coord] = carts[-1]

      rails[coord] = c
  do_run = True
  it = 1
  while do_run:
    carts.sort(key=lambda cart: (cart.y, cart.x))
    i = 0
    n = len(carts)
    while i < n:
      cart = carts[i]
      del locations[cart.coord()]
      cart.tick()
      loc = cart.coord()
      if loc in locations:
        carts.remove(cart)
        carts.remove(locations[loc])
        if locations[loc].time == it:
          i -= 1
        del locations[loc]
        n -= 2
        continue
      locations[loc] = cart

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
      i += 1
    if len(carts) == 1:
      print carts[0].id,carts[0].coord()
      break
    it += 1
