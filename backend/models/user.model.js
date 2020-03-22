const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
     password: {
        type: String,
        required: true,
    },
    image: String,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
}, {
    timestamps: true,
})

const user = mongoose.model('user', userSchema);
module.exports = user;