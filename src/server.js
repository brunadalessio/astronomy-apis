const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const nasa_key = '12345678910';

app.get('/apod', async (req, res) => {
    try {
        const todayDate = new Date().toISOString().split('T')[0];
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: nasa_key,
                start_date:"2024-01-01",
                end_date: todayDate
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
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/news', async(req, res) => {
    try{
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles');
        const responseData = response.data;
        res.json(responseData);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
