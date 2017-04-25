from bs4 import BeautifulSoup
import redis
import requests

r = redis.Redis()

USER_AGENT = 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405'

status = {}

while True:
    url = r.spop('websites')
    if url is None:
        print 'We are done'
        break
    print 'url is', url
    status[url] = 'FAILED'

    resp = requests.get(url, headers={'User-agent': USER_AGENT})

    if resp.status_code != 200:
        print 'FAILED to download', url
        continue

    soup = BeautifulSoup(resp.text, 'html.parser')

    for link in soup.find_all('a'):
        if '.chownow.com' in link.get('href', ''):
            status[url] = 'SUCCESS'
            break
    for script in soup.find_all('script'):
        if 'chownow.com/static/js/iframe.js' in script.text:
            status[url] = 'SUCCESS'
            break

print 'statuses:', status

target = open('repairs.txt', 'w')

for key in status:
    if status[key] == "FAILED":
        target.write(key + '\n')

target.close()
