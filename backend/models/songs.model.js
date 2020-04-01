const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    singer: [String],
    cover:[String],
    album: {
        type: String,
        
    },
    musicSrc: {
        type : String,
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    emotion: String
}, {
    timestamps: true,
})

const song = mongoose.model('song', songSchema);
module.exports = song;