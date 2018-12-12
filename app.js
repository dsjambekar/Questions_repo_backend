const express = require('express');
const bodyParser = require('body-parser');
// var cors = require('cors')

const product = require('./routes/product.routes'); // Imports routes for the products
const question = require('./routes/question.routes'); // Imports routes for the question
const app = express();
// app.use(cors());
// app.options('*', cors());

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
  });


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://root:root123@ds133162.mlab.com:33162/productstutorial';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/questions', question);

console.log(process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);