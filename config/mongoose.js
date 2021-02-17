// CREATE AN EXAM DATABASE AND PUT IT AS A FIRST PARAMETER TO mongoose.connect

const mongoose = require('mongoose');

module.exports = (app) => {
mongoose.connect('mongodb://localhost/booking_uni', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', console.log.bind(console, 'Exam DB Connected!'))
}