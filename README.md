# cloud_worker

## description
So, it's simple cloud worker with puppeteer and mongodb installed on it.
The main idea is:
- use the worker without redeploying container when the scraper code base changes.

- better to set up some ```key``` on recieving tasks, bcs someone can use this worker

### usage on heroku

create heroku and log in via it

then, in cmd:

- heroku login
- git init
- heroku create
- heroku apps
- heroku git:remote -a <app_name>// 
- heroku buildpacks:set jontewks/puppeteer
- heroku buildpacks:add heroku/nodejs
- git add .
- git commit -m "deploy"
- git push heroku master --force
// here the app is ready to use
//add app url to workers in controller
http://localhost:5001/
// and here you can connect to it for watching logs
- heroku logs --tail 