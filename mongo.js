const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginSignupPage")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(() => {
        console.log("Error in connecting");
    });

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const collection = mongoose.model("collection1", LogInSchema);
module.exports = collection;

