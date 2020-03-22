const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    image: {
        type: String,
       
    },
    description: {
        type: String,
        
    },
}, {
    timestamps: true,
})

const song = mongoose.model('song', songSchema);
module.exports = song;