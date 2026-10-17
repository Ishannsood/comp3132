require('dotenv').config();   // loads DB_URL from the .env file (kept out of git)
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

// TODO - Update your mongoDB Atals Url here to Connect to the database
// Put your Atlas connection string in the .env file (see .env.example)
const DB_URL = process.env.DB_URL || "";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Add Note routes: /notes and /notes/:noteId
app.use('/', noteRoutes);

// Error handler (e.g. malformed JSON in the request body)
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message || "Server Error" });
});

if (!DB_URL) {
    console.log('DB_URL is empty. Copy .env.example to .env and paste your MongoDB Atlas connection string.');
    process.exit(1);
}

// Connect to the database
mongoose.connect(DB_URL).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
    app.listen(PORT, () => {
        console.log("Server is listening on port " + PORT);
    });
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit(1);
});
