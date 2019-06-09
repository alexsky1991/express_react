const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

let number = 0;

app.get('/express_backend', (req, res) => {

	fs.readFile('data.json', (err, data) => {  
	    if (err) console.log(err);

	    data = JSON.parse(data);

	    let question = data[number];
		number++;

	    res.send({ 
			express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT',
	  		data: question  
	  	});

	});

});

app.get('/express_all', (req, res) => {

	fs.readFile('data.json', (err, data) => {  
	    if (err) console.log(err);

	    data = JSON.parse(data);
	    res.send({ data: data })
	});

});

app.post('/express_post', (req, res) => {

    let json = JSON.stringify(req.body.data, null, 2); 

    fs.writeFile('data.json', json, 'utf8', () => {
		console.log('The file has been saved!');
	});
		
});


const requestApi = () => (
	request("https://engine.lifeis.porn/api/millionaire.php?q=2&apikey=rDFm5d1L49GuPfR3nOdsbptVf7xZX3Y6j5e", (error, response, body) => {

		console.log(response.statusCode )

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

// callNTimes(requestApi, 120, 2000);





