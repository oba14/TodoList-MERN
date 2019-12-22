const express = require('express');
const todoListRoutes = express.Router();
//const bcrypt = require('bcryptjs');
let TodoList = require('./schema');

// Add new todo
todoListRoutes.route('/add').post((req, res) => {
	let addTodo = new TodoList(req.body);
	addTodo.save()
		.then(reqq => {
			console.log('todo added ', reqq);
			
			res.sendStatus(200);
		})
		.catch(err => {
			console.log('todo NOT added ', reqq);
			res.sendStatus(400);
		});
});

// Edit todo
todoListRoutes.route('/edit/:id').put(async(req, res) => {
	const {id} = req.params;

    await TodoList.findByIdAndUpdate(id, req.body)
    	.then(reqq => {
			console.log('todo Updated ', reqq);
			res.sendStatus(200);
	})
	.catch(err => {
		console.log('todo NOT updated ', err);
		res.sendStatus(400);
	});
});

// Add new todo
todoListRoutes.route('/delete/:id').delete(async (req, res) => {
	const {id} = req.params;
	console.log('Id of item to be DELETED', id);
	
    await TodoList.findByIdAndDelete(id)
    	.then(reqq => {
			console.log('todo deleted ', reqq);
			res.sendStatus(200);
	})
	.catch(err => {
		console.log('todo NOT deleted ', err);
		res.sendStatus(400);
	});
});

// Get allData
todoListRoutes.route('/allData').get((req, res)=> {
	TodoList.find((err, data) => err ? res.sendStatus(400) : res.json(data));
});

module.exports = todoListRoutes;
