const express = require("express");
const notes = require("./Data/Notes");
const env = require("dotenv");
const cors = require("cors");
const connnectDB = require("./config/DB");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const { notFound, errorHandler } = require("./middlewere/errorMiddleware");

// Load environment variables from .env file
env.config();
connnectDB();


// Define port, using environment variable or default to 6000
const Port = process.env.PORT || 6000;

const app = express();

// Use cors middleware to enable CORS
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Api running successfully.....");
});

// app.get("/api/notes", (req, res) => {
//     res.json(notes);
// });

app.use("/api/users", userRoutes)
app.use("/api/note", noteRoutes)



app.use(notFound);
app.use(errorHandler);
// Listen on the defined port
app.listen(Port, () => {
    console.log('====================================');

    console.log(`Server listening on port ${Port}`);
    console.log('====================================');

});
