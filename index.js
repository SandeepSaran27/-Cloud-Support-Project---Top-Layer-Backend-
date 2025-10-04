require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const utilityRouter = require('./routes/UR');
const PORT = process.env.PORT;
const MONGO_URl = process.env.MONGO_URl;

//Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongodb
mongoose.connect(MONGO_URl)
.then(() => {console.log("Mongoose connected")})
.catch((err) => {console.log("Mongoose Error:", err)});

//Router
app.use('/', utilityRouter);

app.listen(PORT, () => {
    console.log("Server is connected.... at 3000");
})