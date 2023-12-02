const mongoose = require('mongoose');
mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo Db connected successfully');
})

connection.on('error', (err) => {
    console.log("Mongo Db connection error:", err);
})

module.exports = mongoose;