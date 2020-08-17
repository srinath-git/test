const express = require('express');
const app = express();
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
        res.json(data);
    } catch(err) {
        res.status(500);
        res.json({'msg': err})
    };
})

app.get('/:id', async (req, res, next) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${req.params.id}`);
        const data = await response.json();
        res.json(data);;
    } catch(err) {
        // next(err);
        res.status(500);
        res.json({'msg':err});
    }
})

app.patch('/:id', async (req, res, next) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${req.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              title: 'foo'
            }),
        });
        const data = await response.json();
        res.json(data);;
    } catch(err) {
        // next(err);
        res.status(500);
        res.json({'msg':err});
    }
})

app.listen(port);