import redis

conn = redis.Redis()

with open('websites.txt', 'r') as fp:
  for line in fp:
    line = line.strip()
    conn.sadd('websites', line)

num_lines = sum(1 for line in open('websites.txt'))

print num_lines, "websites added to Redis key, 'websites'."
