from bs4 import BeautifulSoup
import redis
import requests
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.PhantomJS()
driver.set_window_size(1024, 768)

r = redis.Redis()

# poses as a device to get around websites that block any bots. I'm not sure if
# there is any advantage in using a different device, but worth looing in to.
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

    # these for-loops are the the obvious cases to scrape for, but others may exist
    for link in soup.find_all('a'):
        if '.chownow' in link.get('href', ''):
            status[url] = 'SUCCESS'
            break
    for link in soup.find_all('a'):
        if 'chownow' in link.get('id', ''):
            status[url] = 'SUCCESS'
            break
    for link in soup.find_all('script'):
        if '.chow.js' in link.get('src', ''):
            status[url] = 'SUCCESS'
            break
    for link in soup.find_all('script'):
        if 'chownow' in link.get('src', ''):
            status[url] = 'SUCCESS'
            break
    for link in soup.find_all('iframe'):
        if 'chownow' in link.get('src', ''):
            status[url] = 'SUCCESS'
            break
    for script in soup.find_all('script'):
        if 'chownow.com/static/js/iframe.js' in script.text:
            status[url] = 'SUCCESS'
            break

    # begin check for dynamically rendered content
    if status[url] == 'SUCCESS':
        continue
    print("falling back to phantomjs for ", url)

    while len(driver.window_handles) > 1:
        driver.close()
        driver.switch_to.window(driver.window_handles[0])

    driver.get(url)

    sbtn = None
    try:
        sbtn = driver.find_element_by_partial_link_text('Order')
        print("found Order button")
    except:
        print("no Order button")
    if not sbtn:
        try:
            sbtn = driver.find_element_by_partial_link_text('ORDER')
            print("found ORDER button")
        except:
            print("no ORDER button")
        if not sbtn:
            try:
                sbtn = driver.find_element_by_xpath("//a[contains(@href, 'order')]")
                print("found order button by URL")
            except:
                print("no order button by URL")

    if not sbtn:
        print("no button found")
        continue

    print("clicking button")
    sbtn.click()
    time.sleep(2)

    if 'chownow' in driver.current_url:
        print("page navigated to chownow")
        status[url] = 'SUCCESS'
        continue
    elif len(driver.window_handles) > 1:
        print("looks like a popup")
        driver.switch_to.window(driver.window_handles[-1])
        if 'chownow' in driver.current_url:
            print("chownow opened in a new window")
            status[url] = 'SUCCESS'
            continue
    else:
        try:
            iframe = driver.find_element_by_xpath("//iframe[contains(@src, 'chownow')]")
            print("found chownow iframe")
            status[url] = 'SUCCESS'
            continue
        except:
            print("no chownow iframe found")

print 'statuses:', status

# opens and writes the broken websites to repairs.PID.txt
repair_file = 'repairs.%s.txt' % os.getpid()

with open(repair_file, 'w') as fp:
    for key, val in status.iteritems():
        if val == 'FAILED':
            fp.write(key + '\n')
