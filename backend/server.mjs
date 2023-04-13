import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/getsensors', async (req, res) => {
    try {
        const data = await api.getsensors();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

class sensorApi {
    constructor() {
    }

    async getsensors() {
        const response = await fetch('https://api-samenmeten.rivm.nl/v1.0/Things');
        const data = await response.json();
        return data;
    }

    async getsensors() {
        const response = await fetch('https://api-samenmeten.rivm.nl/v1.0/Things');
        const data = await response.json();
        return data;
    }
}

let api = new sensorApi();
