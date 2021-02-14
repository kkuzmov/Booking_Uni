const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bookedHotels: [],
    offeredHotels: []
})

module.exports = mongoose.model('User', userSchema)