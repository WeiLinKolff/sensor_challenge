const express = require('express');

const app = express();	

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/getsensors', (req, res) => {
    res.send('Hello World');
});

// classes
class sensorApi{
	constructor(){
    }
  	async getsensors(){
        data = await fetch('https://api-samenmeten.rivm.nl/v1.0/Things');
    }
}

let classmate = new ClassMates("Mike Will",15);