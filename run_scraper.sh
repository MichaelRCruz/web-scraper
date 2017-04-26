#!/bin/bash

python populate.py

for i in $(seq 10)
do python script.py &
done
wait # for everything

python concat.py
