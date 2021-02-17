const mongoose = require('mongoose');
let ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;
let EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `${props.value} is invalid! Username should consist only of english letters and digits`
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `Password must consist only of english letters and digits`
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) =>{
                return EMAIL_PATTERN.test(value);
             },
            message: (props)=>{
                return `Incorrect email`
            }
        }
    },
    bookedHotels: [],
    offeredHotels: []
})

module.exports = mongoose.model('User', userSchema)