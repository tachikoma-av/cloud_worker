const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json());
const path = require('path');
//some comment
// async function run_browser() {
//     browser = await puppeteer.launch({
//       headless: false, 
//       userDataDir: __dirname+"/user_data/",
//       args: ['--no-sandbox']
//     });
//     page = (await browser.pages())[0];
//     // await page.setViewport({ width: 1366, height: 768});
//     // await page.goto('https://facebook.com',{"waitUntil":["domcontentloaded"], 'timeout':0});
//     // return [browser, page]
// };
var query_num = 0
var tasks = {}


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
	await req.body.stats
	if (req.body.stats!=null){
		// console.log('sending the tasks.'+req.body.stats)
		res.send(tasks[req.body.stats])
		return
	}
	let executionCode = await req.body.query;
	// console.log(executionCode);
	query_num++
	let task = tasks[query_num] = {}
	task.executionCode = executionCode
	//false == 'not_done'
	//true == 'finished' + this.data
	//null == 'some_error' + this.data
	task.status = false//not done
	// true // finished
	// null // got some error, check for error section
	if (typeof(executionCode) == undefined) {
		res.send('function_incorrect');
		//delete tasks.query_num
		return
	} else {
		res.send(''+query_num);
	}
	let status_data = false;
	let finished = false;
	status_data = await eval(executionCode);
	if (!finished){
		console.log('successfully finished task '+ query_num)
		task.status = status_data;
	} else {
		console.log('there was an error in task '+ query_num)
		task.status = 'function_error'
	}
});

app.get('/test',async function(req,res){
  console.log('got to /test, youll get answer in 10,000ms')
  await new Promise(resolve => setTimeout(resolve, 10000));
  res.send('url|likes|telephone|email|website\n')
})

app.get('/sample',async function(req,res){
    await page.screenshot({path: 'sample.png'});
    res.sendFile(__dirname+'/sample.png');
});
app.get('/down',async function(req,res){
  // await page.screenshot({path: 'sample.png'});
  res.sendFile(__dirname+'/data.csv');
})
async function main() {
  app.listen(process.env.PORT || 5001, "0.0.0.0",function() {
  console.log('Application worker ' + process.pid + ' started...');
  });
  // scrape('real estate agent new york', 1000);
};
  
main();