const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'enabled'
    },
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
    image: [{
        type: String,
    }],
    coverImg: [{
        type: String,
    }],
    planRole: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 1
    },
    myPlaylist: [{
        type: Schema.Types.ObjectId,
        ref: 'songs'
    }],
    RoleToken: String,
    RoleTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
}, {
    timestamps: true,
})

const user = mongoose.model('user', userSchema);
module.exports = user;