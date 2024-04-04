const express = require("express");
const notes = require("./Data/Notes");
const env = require("dotenv");

// Load environment variables from .env file
env.config();

// Define port, using environment variable or default to 6000
const Port = process.env.PORT || 6000;

const app = express();

app.get("/", (req, res) => {
    res.send("Api running successfully.....");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((n) => n?._id === req?.params?.id);
    return res.json(note);
});

// Listen on the defined port
app.listen(Port, () => {
    console.log(`Server listening on port ${Port}`);
});
