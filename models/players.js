const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    dob: {type: String, required: true},
    nationality: {type: String, required: true},
    img: {type: String, required: true}, 
    position: {type: String, required: true}, 
    team: {type: String, required: true}, 
    number: {type: String, required: true},
    overall: {type: String, required: true},
});

const Player = mongoose.model('Player', playerSchema); 

module.exports = Player;