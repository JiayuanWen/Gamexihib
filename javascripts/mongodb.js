const mongoose = require('mongoose');
const database = `mongodb+srv://gamexhibi:ihatemtx@sweng465-gamexhibi.ijodktv.mongodb.net/?retryWrites=true&w=majority`;

/*
mongoose.connect('mongodb+srv://gamexhibi:ihatemtx@sweng465-gamexhibi.ijodktv.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log('[MongoDB] Connection error:');
        throw err;
    }
    else {
        console.log('[MongoDB] Successfully connected to Mongo DB');
    }
});
*/

const connectDB = async() => {
    await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("[mongodb.js] Successfully connected to database");
};

module.exports = connectDB;