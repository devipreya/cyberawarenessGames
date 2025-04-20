const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust the timeout (default is 30000)
    socketTimeoutMS: 45000, // Adjust socket timeout
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("Error in connecting to MongoDB:", err.message);
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

