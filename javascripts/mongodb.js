const mongoose = require('mongoose');
const database = `mongodb+srv://gamexhibi:ihatemtx@sweng465-gamexhibi.ijodktv.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async() => {
    await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("[MongoDB] Successfully connected to database");
};

module.exports = connectDB;