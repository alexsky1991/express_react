const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const port = process.env.PORT || 5000;

const data = require("./data.json");

app.listen(port, () => console.log(`Listening on port ${port}`));

let number = 0;

app.get('/express_backend', (req, res) => {

	let question = data[number];
	number++;

	res.send({ 
		express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT',
  		data: question  
  	});
});


const requestApi = () => (
	request('https://engine.lifeis.porn/api/millionaire.php?q=3', (error, response, body) => {
	    if (!error && response.statusCode == 200) {
	    	let info = JSON.parse(body)

	    	info = info.data

	    	fs.readFile('data.json', 'utf8', (err, data) => {
			    if (err)
			        console.log(err);
			    
			    data = JSON.parse(data); 

			    if(data.some(el => el.id === info.id))
			    	return
					
			    data = [...data, info];

			    json = JSON.stringify(data, null, 2); 

			    fs.writeFile('data.json', json, 'utf8', () => {
					console.log('The file has been saved!');
				});
			})
	    }
	})
)

requestApi();

// const callNTimes = (func, num, delay) => {
// 	if (!num) return;

// 	func();

// 	setTimeout(() => { callNTimes(func, num - 1, delay); }, delay);
// }

// callNTimes(requestApi, 150, 2000);





