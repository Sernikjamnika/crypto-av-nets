#!/bin/bash

# set answers for clients
answers=(0 0 0)

# create group
group_id=$(python client.py --create True --group_capacity ${#answers[@]})
echo "ID grupy: " $group_id

# start voting
for answer_id in ${!answers[@]}
do
    python client.py --group_id $group_id --answer ${answers[$answer_id]} &
    pids[${answer_id}]=$!
done

# wait for all pids
for pid in ${pids[*]}; do
    wait $pid
done

