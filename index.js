require('dotenv').config();


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL
});

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define a GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/get', (req, res) => {
    client.query('SELECT * FROM player, drone, game_connection', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/get/players', (req, res) => {
    client.query('SELECT * FROM player', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/get/drone', (req, res) => {
    client.query('SELECT * FROM player', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/get/game', (req, res) => {
    client.query('SELECT * FROM game_connection', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});
// Define a POST route to handle a user login
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username === 'admin' && password === 'password') {
        res.send('Welcome, Admin!');
    } else {
        res.send('Invalid username or password');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
