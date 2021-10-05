// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const Player = require('./models/players');
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
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongod connected: '));
db.on('disconnected', () => console.log('mongod disconnected'));

//========================================
//              MIDDLEWARE
// =======================================
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// =======================================
//              ROUTES
// =======================================

// INDEX (get)
app.get("/home" , (req, res) => {
  Player.find({}, (error, allPlayers) => {
    res.render('index.ejs', {
      players: allPlayers,
    })
  })
});

// NEW (get)
app.get('/home/new', (req, res) => {
  res.render('new.ejs');
});

// DESTROY (delete)
app.delete('/home/:id', (req, res) => {
  Player.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/home');
  });
});

// UPDATE (put)
app.put('/home/:id', (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body, 
    {new: true},
     (error, updatedPlayer) => {
       res.redirect(`/home/${req.params.id}`);
     })
  })


// CREATE (post)
app.post('/home', (req, res) => {
  Player.create(req.body, (error, createdPlayer) => {
    res.redirect('/home');
  });  
});


// EDIT (get) (put)
app.get('/home/:id/edit', (req, res) => {
  Player.findById(req.params.id, (error,foundPlayers) => {
    res.render('edit.ejs', {players: foundPlayers})
  })  
})

// SHOW (get)
app.get('/home/:id', (req, res) => {
  Player.findById(req.params.id, (err, foundPlayers) => {
    res.render('show.ejs', { 
      players: foundPlayers,
    })
  })
});


// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log('express is listening on:', PORT));