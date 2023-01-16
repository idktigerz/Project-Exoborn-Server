require('dotenv').config();

var pg = require('pg');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connectionString = process.env.DATABASE_URL
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    ssl: {
        require: true, 
        rejectUnauthorized: false
    },
    max: 1
})

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define a GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/game', gameRouter);

app.get('/get/game', (req, res) =>{
    pool.query('SELECT * from game_connection', (err, result) =>{
        if(err){
            res.status(500).json({
                error:err.message
            });
        }else{
            res.json(result.rows);
        }
    });
});


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
