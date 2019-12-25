const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const port = 5000;
const cors = require('cors');
const mongoose = require("mongoose");
let bodyParser = require('body-parser');
const todoListRoutes = require('../server/route_registration');

app.use(cors());
app.use(bodyParser.json());

// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));


//app.use(express.static('public'));

/************** mongodb ************************* */

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database '+ err)}
);
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

/**************** ROUTES ********/
app.use('/todoList', todoListRoutes); // REGISTRATION ROUTES

// Setup a global error handler.
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

/**
 * if none of the routes match
 */
app.get('*', (req, res) => {
  res
    .status(404)
    .send({
      message: 'page not found'
    });
});


app.listen(port, () => console.log('Server listening on port ' + port));

module.exports.app = app;