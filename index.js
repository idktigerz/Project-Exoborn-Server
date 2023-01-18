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

app.get('/get/game', (req, res) => {
    pool.query('SELECT * from game_connection', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

app.put('/login/:game_code', (req, res) => {
    let game_code = req.params.game_code;
<<<<<<< HEAD
    console.log(game_code);
    pool.query(`SELECT * from game_connection WHERE game_code = ${game_code};`, (err, result) =>{
        if(err){
=======
    pool.query(`SELECT * from game_connection WHERE game_code = ${game_code};`, (err, result) => {
        if (err) {
>>>>>>> 2ad678548094b65f09818d15897b283011a22809
            result.status(500).send('Error, cannot retrive information from the database');
        } else if (res.rows == 0) {
            result.status(430).send('Error, no game with that code')
        } else {
            pool.query(`UPDATE game_connection SET game_connected = true`, (err, res) => {
                if (err) {
                    console.log(err.stack);
                }
            });
        }
    });
});


app.get('/get/game/status', (req, res) => {
    pool.query('SELECT game_connected from game_connection', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/get/player', (req, res) => {
    pool.query('SELECT * from player', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    })
})


app.get('/get/drone', (req, res) => {
    pool.query('SELECT * from drone', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    })
})

app.get('/get/drone/:id', (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * from drone WHERE drone_id = $1', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    })
})

app.put('/set/drone/:id/:upgradeNum/:upgradeNumID', (req, res) => {
    const id = req.params.id;
    const upgradeNum = req.params.upgradeNum;
    const upgradeNumID = req.params.upgradeNumID;
    pool.query(`UPDATE drone SET ${upgradeNum} = ${upgradeNumID} WHERE drone_id = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});
app.put('/set/drone/resourses/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`UPDATE drone SET drone_resources_amount = 0 WHERE drone_id = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});
app.post('/set/ids', (req, res) => {
    pool.query(`insert into player default values`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });

    pool.query(`insert into drone (drone_docked,drone_resources_amount,drone_upgrade_1,drone_upgrade_2,drone_upgrade_3) values(true,0,1,1,1)`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});
app.get('/max/id', (req, res) => {
    pool.query(`select MAX(player_id) from player`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows[0]);
        }
    });
});
app.get('/get/stats', (req, res) => {
    pool.query('select * from drone_stat order by stat_id asc', (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    })
})


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
