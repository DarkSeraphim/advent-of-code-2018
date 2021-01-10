daynr=`printf "%02d" $1`
cat day-$daynr/input.txt | python3 day-$daynr/part-$2.py
