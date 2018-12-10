with open('input') as f:
  words = f.readlines()[0].split(" ")
  players = int(words[0])
  marbles = int(words[6])
  current_player = 0
  board = [0]
  position = 0
  score = [0] * players
  for marble in range(marbles):
    marble += 1
    if len(board) == 1:
      board.append(marble)
      position += 1
    elif marble % 23 == 0:
      a = (position - 7) % len(board)
      score[current_player] += marble + board.pop(a)
      position = a
    else:
      a = ((position + 1) % len(board)) + 1
      position = a
      board.insert(position, marble)
    current_player += 1
    current_player %= players
  print max(score)

