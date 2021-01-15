const db = require('../models');

exports.getTodo = function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos);
        })
        .catch(function (err) {
            res.send(err)
        })
}

exports.createTodo =  function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.json(newTodo)
        })
}

exports.findTodo = function (req, res) {
    db.Todo.findById(req.params.todoID).then(function (todo) {
        res.json(todo)
    })
}

exports.updateTodo = function (req, res) {
    db.Todo.findOneAndUpdate({
        _id: req.params.todoID
    }, req.body, {
        new: true
    }).then(
        function (todo) {
            res.send(todo)
        }
    )
}

exports.deleteTodo = function (req, res) {
    db.Todo.remove({_id: req.params.todoID}).then(function () {
        res.json({message: 'We deleted that shit!'})
    })
}

module.exports = exports;