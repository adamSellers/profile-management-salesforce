# This is a Salesforce Identity Reference App
## Introduction
This app is a node + react.js reference app for managing contact profiles in Heroku. 

## Pre-Requisites
You have signed up for the following accounts: 
1. [Salesforce Developer Org](https://developer.salesforce.com)
2. [Heroku Free Account](https://www.heroku.com/free)

You have created your [Salesforce Connected App](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_defining_remote_access_applications.htm).

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
heroku config:set SFCLIENTID={your client id here}
heroku config:set SFCLIENTSECRET={your client secret here}
````

to be continued... 