daynr=`printf "%02d" $1`
cat day-$daynr/input.txt | node day-$daynr/part-$2.js
