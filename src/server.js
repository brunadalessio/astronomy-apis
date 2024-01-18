const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const nasa_key = '12345678910';

app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: nasa_key,
            }
        });
        const responseData = response.data;
        console.log(responseData);
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/sky', async (req, res) => {
    try {
        const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/');
        const responseData = response.data.bodies;
        console.log(responseData);
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
