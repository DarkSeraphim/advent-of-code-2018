with open('input') as f:
  line = f.readlines()[0]
  numbers = map(lambda s: int(s), line.split(" "))
  def recurse(numbers):
    children = numbers[0]
    meta = numbers[1]
    offset = 2
    result = 0
    for child in range(children):
      (r, o) = recurse(numbers[offset:])
      offset += o
      result += r

    return (result + sum(numbers[offset:offset+meta]), offset+meta)

  print recurse(numbers)[0]
