# This is a Salesforce Identity Reference App
## Introduction
This app is a node + react.js reference app for managing contact profiles in Heroku.

## Things that are broken, need work or.. here there be dragons!
Most of it at this stage

## Installation
Clone the repo
````
git clone https://github.com/adamSellers/profile-management-salesforce.git
````
Change directory and setup
````
cd profile-management-salesforce && npm install
````
Setup Heroku
````
heroku create my-cool-appname
````
Setup the config vars as necessary
````
heroku config:set APP_URL=$(heroku info -s | grep web_url | cut -d= -f2)
````

to be continued... 