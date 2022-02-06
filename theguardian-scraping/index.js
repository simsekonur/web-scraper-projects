const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');


const app = express();

const url = 'https://www.theguardian.com/uk';

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
       
        console.log(articles[0]);

    })
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
