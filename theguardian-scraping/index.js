const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express();

const url = 'https://www.theguardian.com/uk';

// app.METHOD(PATH, HANDLER)
app.use(cors());
app.get('/', (req, res) => {
    res.json('Hello');
})


app.get('/articles', (req, res) => {
    console.log('This is invoked');
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];
        // for each item with the class name fc-item__title
        $('.fc-item__title').each(function(){
            // get the title using text() method
            const title = $(this).find('span.js-headline-text').text();
            // get the href attr of a 
            const url = $(this).find('a').attr('href');

            // push it into an array so that
            // you can take it from outside
            articles.push({ title, url})
        })
       
        res.json(articles);

    })
    .catch(err => console.log(err));

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
