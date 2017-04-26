import glob
import os

target = open('repairs.txt', 'w')

# writes content from temporary .txt files into repairs.txt
for file in glob.glob('repairs.*.txt'):
    with open(file, 'r') as fp:
      for line in fp:
        line = line.strip()
        target.write(line + '\n')

# removes temp files when no longer needed
for file in glob.glob('repairs.*.txt'):
    os.remove(file)
