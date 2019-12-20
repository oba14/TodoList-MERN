const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// collection and schema for Registration
let TodoList = new Schema({
	id: {
		type: String
	},
	title: {
		type: String
	},
	text: {
		type: String
	},
	category: {
		type: String
	},
	done: {
		type: Boolean,	
	},
	dueDate: {
		type: Date,
	}
},{
		collection: 'TodoList'
});

module.exports = mongoose.model('TodoList', TodoList);
