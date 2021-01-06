export AOC_SESSION=53616c7465645f5f9f876cf8650b7b0fd3ab49d82a0b89bbdd478e78ce94ec72
curl -o "day-$(printf %02d $1)/input.txt" https://adventofcode.com/2018/day/$1/input --cookie "session=$AOC_SESSION"
