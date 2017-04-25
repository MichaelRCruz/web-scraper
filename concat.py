import glob
import os

target = open('repairs.txt', 'w')

for file in glob.glob('repairs.*.txt'):
    with open(file, 'r') as fp:
      for line in fp:
        line = line.strip()
        target.write(line + '\n')

for file in glob.glob('repairs.*.txt'):
    os.remove(file)
