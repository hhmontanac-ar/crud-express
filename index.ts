const mongoose = require('mongoose')
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

const start = async () => {
    await mongoose.connect('mongodb://localhost/crud-express').then(() => {
        console.log("Connected to Database");
        }).catch((err: any) => {
            console.log("Not Connected to Database ERROR! ", err);
        });
    
    app.listen(PORT, () => {
        console.log(`Express server listening on port ${PORT}`);
    });
}

start();