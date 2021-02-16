// CHECK SCHEMA PROPERTIES/NAMES

const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
        maxlength: 50
    },
    imgUrl: {
        type: String,
        required: true
    },
    freeRooms: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    owner: {
        type: String,
        required: true
    },
    usersBookedARoom: [],
})


module.exports = mongoose.model('Hotel', hotelSchema);