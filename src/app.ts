import express, { Express } from 'express';

import 'dotenv';

const app: Express = express();
const port = 3000;
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('This service is running well!');
});
app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
