#!/bin/bash

python populate.py

for i in $(seq 10)
do python script.py &
done
for job in `jobs -p`
do wait "$job"
done

python concat.py
