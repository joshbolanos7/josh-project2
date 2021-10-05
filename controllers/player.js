// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const playerRouter = express.Router();
const Player = require("../models/players")


// =======================================
//                SEED
// =======================================
const playerSeed = require('../models/playerSeed')

playerRouter.get('/seed', (req, res) => {
    Player.deleteMany({}, (error, allplayers) => {})
    Player.create(playerSeed, (error, data) => {
        res.redirect('/home');
    })
});

// =======================================
//              ROUTES
// =======================================


// INDEX (get)
playerRouter.get("/" , (req, res) => {
    Player.find({}, (error, allPlayers) => {
      res.render('index.ejs', {
        players: allPlayers,
      })
    })
  });
  
  // NEW (get)
  playerRouter.get('/new', (req, res) => {
    res.render('new.ejs');
  });
  
  // DESTROY (delete)
  playerRouter.delete('/:id', (req, res) => {
    Player.findByIdAndDelete(req.params.id, (err, data) => {
      res.redirect('/home');
    });
  });
  
  // UPDATE (put)
  playerRouter.put('/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body, 
      {new: true},
       (error, updatedPlayer) => {
         res.redirect(`/home/${req.params.id}`);
       })
    })
  
  
  // CREATE (post)
  playerRouter.post('/', (req, res) => {
    Player.create(req.body, (error, createdPlayer) => {
      res.redirect('/home');
    });  
  });
  
  
  // EDIT (get) (put)
  playerRouter.get('/:id/edit', (req, res) => {
    Player.findById(req.params.id, (error,foundPlayers) => {
      res.render('edit.ejs', {players: foundPlayers})
    })  
  })
  
  // SHOW (get)
  playerRouter.get('/:id', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayers) => {
      res.render('show.ejs', { 
        players: foundPlayers,
      })
    })
  });

  //Export Functionality
  module.exports = playerRouter;