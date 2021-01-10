import sys
from collections import deque


words = sys.stdin.readlines()[0].split(" ")
players = int(words[0])
marbles = int(words[6])
current_player = 0
board = deque()
board.append(0)
position = 0
score = [0] * players
for marble in range(marbles):
  current_player = marble % players
  marble += 1
  if len(board) == 1:
    board.append(marble)
    position += 1
  elif marble % 23 == 0:
    board.rotate(7)
    score[current_player] += marble + board.pop()
    board.rotate(-1)
  else:
    board.rotate(-1)
    board.append(marble)

print(max(score))
