const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');



const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

const database = module.exports = () => {
    try {
        mongoose.connect('mongodb+srv://ayeshagalantsafety:7H2LWQ6U0NiYcHwh@cluster0.gjryjma.mongodb.net/to_do?retryWrites=true&w=majority',
        );
        console.log('Database connected successfully!')
    } catch (error) {
        console.log(error)
        console.log('Unable to connect db')
    }
}

database();

setupController(app);

apiController(app);

const port = process.env.PORT || 3010;

app.listen(port, () => {
        console.log('Server is up!')
    })