const express = require('express');
const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());
const path = require('path');



app.get('/',function(req,res){
	console.log('got to /')

	res.sendFile(path.join(__dirname+'/templates/do.html'));
	console.log('debug')
	//__dirname : It will resolve to your project folder.
});
app.get('/do',async function(req,res){
    // ' this code accepts string from 'query' parameter, and executes that string in nodejs env
    executionCode = await req.query.query;
    console.log(executionCode);
    let result = await eval(executionCode);
    // funcs = async function(){
    //     let result = await scrape_page();
    //     return result;
    //   };
    // then!
    // funcs()
    res.send(result);
  });
app.get('/do_json',async function(req,res){
	// await req.body.api_code
	// if (req.body.api_code !== api_code){
	// 	console.log('api_code is wrong! aborting it')
	// }
	let executionCode = await req.body.query;
	await eval(executionCode);
	res.send('')
});

app.get('/test',async function(req,res){
  console.log('got to /test, youll get answer in 10,000ms')
  await new Promise(resolve => setTimeout(resolve, 10000));
  res.send('url|likes|telephone|email|website\n')
})

async function main() {
  app.listen(process.env.PORT || 5001, "0.0.0.0",function() {
  console.log('Application worker ' + process.pid + ' started...');
  });
  // scrape('real estate agent new york', 1000);
};
  
main();