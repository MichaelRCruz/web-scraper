#!/bin/bash

python populate.py

# here is where you can increase the number of "worker" scripts you have running
# e.g., $(seq 20) runs twenty scripts.
for i in $(seq 10)
do python script.py &
done
wait # for everything

python concat.py
