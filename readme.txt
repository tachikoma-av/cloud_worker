create heroku and log in via it

then, in cmd:

heroku login
git init
heroku create
heroku apps
heroku git:remote -a <app_name>// 
heroku buildpacks:set jontewks/puppeteer
heroku buildpacks:add heroku/nodejs
git add .
git commit -m "deploy"
git push heroku master --force
// here the app is ready to use
//add app url to workers in controller
https://aqueous-cove-90505.herokuapp.com/
// and here you can connect to it for watching logs
heroku logs --tail 