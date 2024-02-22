const Todos = require('../models/todoModels');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.get('/api/setupTodos', function(req, res) {

        //seed database
        const starterTodos = [
            {
                username: 'Ayesha',
                todo: 'Stakeholder meeting',
                isDone: true,
                hasAttachment: false
            },
            {
                username: 'Beulah',
                todo: '[Design] Individual Discussion',
                isDone: true,
                hasAttachment: false
            },
            {
                username: 'Luke',
                todo: 'NodeJS Course',
                isDone: false,
                hasAttachment: false
            }
        ];

        // Use Promise.all() to create all todos and wait for all operations to complete
        Promise.all(starterTodos.map(todo => Todos.create(todo)))
            .then(results => {
                res.send(results);
            })
            .catch(err => {
                console.error('Error creating todos:', err);
                res.status(500).send('Error creating todos');
        });
    });
};