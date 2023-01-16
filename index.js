require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var droneRouter = require('./routes/droneRoutes');
var gameRouter = require('./routes/gameRoutes');


// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define a GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/game', gameRouter);


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
