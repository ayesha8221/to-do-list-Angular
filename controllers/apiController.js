const Todos = require('../models/todoModels');
const bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todo/:username', function(req, res) {
        Todos.find({ username: req.params.username })
            .then(todos => {
                res.send(todos);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error fetching todos');
            });
    });

    app.get('/api/todos', function(req, res) {
        Todos.find({})
            .then(todos => {
                res.send(todos);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error fetching todos');
            });
    });

    app.get('/api/todo/:id', function(req, res) {
        Todos.find({_id: req.params.id})
            .then(todo => {
                res.send(todo);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Error fetching todo');
            });
    });

    app.post('/api/todo', async (req, res) => {
        try {
            if (req.body.id) {
                const updatedTodo = await Todos.findByIdAndUpdate(req.body.id, {
                    username: req.body.username,
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment,
                });
                if (!updatedTodo) {
                    return res.status(404).send('Todo not found');
                }
                res.send('Todo updated successfully');
            } else {
                const newTodo = new Todos({
                    username: 'testing',
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment
                });
                await newTodo.save();
                res.send('Todo created successfully');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating/updating todo');
        }
    });

    app.delete('/api/todo/:id', async (req, res) => {
        try {
            const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
            if (!deletedTodo) {
                return res.status(404).send('Todo not found');
            }
            res.send('Todo deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error deleting todo');
        }
    });
}