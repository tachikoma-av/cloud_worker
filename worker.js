const express = require('express');
const app = express();
app.use(express.json());
//eof backend
const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
//


app.get('/', function(req,res){
	console.log('touched?')
	res.send('')
});
app.get('/do', async function(req,res){
	let executionCode = await req.body.query;
	res.send('');
	await eval(executionCode)
	console.log('done')
});

app.get('/shutdown', function(req,res){
	res.send('')
	process.exit(1);
});
async function main() {
  app.listen(process.env.PORT || 5001, "0.0.0.0",function() {
  console.log('Application worker ' + process.pid + ' started...');
  });
};
  
main();