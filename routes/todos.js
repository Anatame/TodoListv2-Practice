const express = require('express');
const router = express.Router();

const db = require('../models')
const helpers = require('../helpers/todos')


router.route('/')
.get(helpers.getTodo)
.post(helpers.createTodo)

router.route('/:todoID')
.get( helpers.findTodo )
.put(helpers.updateTodo)
.delete( helpers.deleteTodo)



module.exports = router;