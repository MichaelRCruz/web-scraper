#!/bin/bash

for py_file in $(find $workers -name *.py)
do
    python $py_file
done
