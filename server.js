// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const Player = require('./models/playerSeed');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

// =======================================
//              DATABASE
// =======================================
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Database Connection Error / success
// Define callback functions. 
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongod connected: '));
db.on('disconnected', () => console.log('mongod disconnected'));

//========================================
//              MIDDLEWARE
// =======================================
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// =======================================
//              ROUTES
// =======================================

// INDEX (get)
app.get("/home" , (req, res) => {
  res.render('index.ejs', { players: Player})
});

// NEW (get)


// DESTROY (delete)


// UPDATE (put)


// CREATE (post)


// EDIT (get) (put)


// SHOW (get)


// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log('express is listening on:', PORT));