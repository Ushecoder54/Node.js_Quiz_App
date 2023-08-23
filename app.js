const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Open a SQLite database connection
const db = new sqlite3.Database('./db/quiz.db');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to get a random question
app.get('/get_question', (req, res) => {
    db.get('SELECT * FROM questions ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(row);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
