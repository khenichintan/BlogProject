const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/adminpanal");

const db = mongoose.connection;

db.once('open', (err) => {
    if (err) {
        console.log(err)
        return false
    }
    console.log("Db is running")
});

module.exports = db;