# Web Scraper

This is a web-scraping application designed to detect the existence of specified content on a web page. The application is capable of detecting both static and dynamically rendered content. There is a considerable and significant time factor involved. For example, I'm estimating five hours for one machine to work through a list of 35,000 websites. Future development will attempt to address this issue.

### Approach Taken

After a little thought on the approach to this application, I realized the most important feature was scalability. The code needs to be able to handle a growing list of websites. Then came the question for handling input and output. Upon my initial attempt, I naively considering using a very very large array (list) to hold the list of websites (please don't laugh). Then I discovered Redis. Redis is used as a store whereby a "worker" script randomly draws from the set (no duplicates). There are ten of these worker scripts running concurrently and then writing information (URLs) to a temporary .txt file. Python concatenates these temporary files as one output and then finally deletes the unnecessary .txt files.

As far as what to scrape for was another interesting adventure. The most challenging of which became scraping dynamically rendered content. PhantomJS took care of this with the help of Selenium. These current methods of scraping will very likely need to be refactored as I am not sure I'm aware of every single edge-case.

For now, I believe this application is a great starting point and could be much much better.

### Getting Started

This documentation will get you a copy of this application and have it up and running on your local machine. Follow the steps below for proper installation and start-up instructions.

#### Prerequisites

Prior to the installation instructions, it is assumed your machine is equipped with the following. Also, if you know how, it is highly recommended that you use a virtual environment when working with Python.

* Node
* Python
* PIP

#### Installing

Execute the following commands in your terminal

1. Clone or fork this repository
```
git clone https://github.com/MichaelRCruz/web-scraper
cd web-scraper
```
2. We will be using Redis. Isn't that exciting! Run this command to install the Redis Server.
```
brew install redis-server
```
3. Okay, now let's get Beautiful Soup, Redis, Requests, and Selenium into your app.
```
pip install bs4 redis requests selenium
```
4. Now for PhantomJS which we will need to use Node.
```
npm -g install phantomjs-prebuilt
```

Okay, great! At this point we have everything we need. Now we just need to get our development environment up and running and we'll be one step closer to taking over the world ;)

Open a new tab or window in your terminal and fire up the Redis server by executing the below command.
```
redis-server
```

Before we can start our application, we need to tell it which websites to scrape. This can be accomplished many different ways. I'll leave that up to you. All you need is to list your websites line-by-line in the ```websites.txt``` file. An example of the format is below.

```
...

https://www.google.com/
https://github.com/
http://michaelcruz.io/
http://stackoverflow.com/

...
```

While we are here, I should note that after the application is finished running, our broken websites will also be listed in the above format, but in to a different file of course. This list can be found in ```repairs.txt```. It will be empty when you first clone the repository. ```repairs.txt``` will be overwritten with new data upon any subsequent execution.

That should do it! I hope you are excited as I am because coding is fun.

###### One Last thing!

To actually run our application run the follow after you have cd'd into the repository.
```
sh run_scrape.sh
```
