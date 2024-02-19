const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3010;

// routes

app.get('/', (req, res) => {
    res.send ('hello miss galant')
})

mongoose.connect('mongodb+srv://ayeshagalantsafety:7H2LWQ6U0NiYcHwh@cluster0.gjryjma.mongodb.net/To-doAPI?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected!');
});

app.listen(3010, () => {
    console.log('app is listening');
});