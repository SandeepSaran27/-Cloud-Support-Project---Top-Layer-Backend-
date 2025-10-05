require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const utilityRouter = require('./routes/UR.js');
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const MAX_RETRIES = 5;
let attempt = 0;

//Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongodb
async function connectToDatabase() {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB.");
        return;
    }

    // Retry logic
    while (attempt < MAX_RETRIES) {
        try {
            attempt++;
            console.log(`Connecting to MongoDB (Attempt ${attempt}/${MAX_RETRIES})...`);

            // Try to connect to MongoDB
            await mongoose.connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
                connectTimeoutMS: 30000,         // 30 seconds timeout for connection
                socketTimeoutMS: 45000           // 45 seconds timeout for socket
            });

            console.log('MongoDB connected!');
            break; // Break out of the loop if successful connection

        } catch (error) {
            console.error(`MongoDB connection attempt failed (Attempt ${attempt})`, error.message);

            if (attempt === MAX_RETRIES) {
                // If max retry attempts reached, throw an error
                throw new Error('Max retry attempts reached, unable to connect to MongoDB');
            }

            // Wait for 5 seconds before retrying
            console.log("Retrying in 5 seconds...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}
connectToDatabase()
    .then(() => {
        console.log('Mongoose connected successfully');
    })
    .catch((err) => {
        console.error('Mongoose connection error:', err);
    });

//Router
app.use('/', utilityRouter);

app.listen(PORT, () => {
    console.log("Server is connected...");
})