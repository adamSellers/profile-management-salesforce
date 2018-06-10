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
heroku config:set SESSIONKEY=asupersecretsessionkey
````

to be continued... 

## Disclaimer or, things the lawyers compel me to say... 
Copyright 2018, Adam Sellers - Sales Engineering, Salesforce.com Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer. 
- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
- Neither the name of the salesforce.com nor the names of its contributors
  may be used to endorse or promote products derived from this software
  without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
