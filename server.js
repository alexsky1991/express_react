const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const port = process.env.PORT || 5000;

const questions = require("./questions.json");

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
	res.send({ 
		express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT',
  		questions: questions  
  	});
});



request('https://engine.lifeis.porn/api/millionaire.php?q=3', (error, response, body) => {
    if (!error && response.statusCode == 200) {
    	let info = JSON.parse(body)
    	// console.log(info.data)
    	console.log(info);

    	info = info.data

    	fs.readFile('message.json', 'utf8', (err, data) => {
		    if (err){
		        console.log(err);
		    } else {

		    let obj = JSON.parse(data); //now it an object
				
		    obj = [...obj, info]; //add some data

		    json = JSON.stringify(obj); //convert it back to json
			console.log(json);

		    fs.writeFile('message.json', json, 'utf8', (err) => {

				if (err) throw err;
				console.log('The file has been saved!');
			}); // write it back 
		}})
    }
})



