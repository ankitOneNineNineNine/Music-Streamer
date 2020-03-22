const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userArray = new Schema({
   users : []
})

const userArray = mongoose.model('userArray', userArray);
module.exports = userArray;