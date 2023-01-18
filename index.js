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
    res.send('Hello stranger, I see you have wondered too far.');
});

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

app.put('/login/:game_code', (req, res) =>{
    let game_code = req.params.game_code;
    res.send(game_code);
    pool.query('SELECT * from game_connection WHERE game_code = $1;', (err, res) =>{
        if(err){
            res.status(500).send('Error, cannot retrive information from the database');
        }else if(res.rows == 0){
            res.status(430).send('Error, no game with that code')
        }else{
            pool.query('UPDATE game_connection SET game_connected = true', (err, res) =>{
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(res.rows);
                }
            });
        }
    });
});


app.get('/get/game/status', (req, res) =>{
    pool.query('SELECT game_connected from game_connection', (err, result) =>{
        if(err){
            res.status(500).json({
                error:err.message
            });
        }else{
            res.json(result.rows);
        }
    });
});

app.get('/get/player', (req, res) =>{
    pool.query('SELECT * from player', (err, result) =>{
        if(err){
            res.status(500).json({
                error:err.message
            });
        }else{
            res.json(result.rows);
        }
    })
})


app.get('/get/drone', (req, res) =>{
    pool.query('SELECT * from drone', (err, result) => {
        if(err){
            res.status(500).json({
                error:err.message
            });
        }else{
            res.json(result.rows);
        }
    })
})

app.get('/get/drone/:id', (req, res) =>{
    let id = req.params.id;
    pool.query('SELECT * from drone WHERE drone_id = $1', (err, result) => {
        if(err){
            res.status(500).json({
                error:err.message
            });
        }else{
            res.json(result.rows);
        }
    })
})

app.put('/set/drone/:id/:upgradeNum', (req, res) =>{
    const id = req.params.id;
    const upgradeNum = req.params.upgradeNum;
    const upgradeNumID = req.body.upgradeNumID;
    console.log("ID: " + id);
    console.log("Upgrade Num: " + upgradeNum);
    console.log("Upgrade Num ID: " + upgradeNumID);
    pool.query(`UPDATE drone SET ${upgradeNum} = ${upgradeNumID} WHERE drone_id = ${id}`, (err, res) =>{
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
