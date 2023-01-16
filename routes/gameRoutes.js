var express = require('express');
var router = express.Router();
var gModel = require("../models/gameModel");

router.get('/get', async function(req, res, next) {
    console.log("Get game info");
    let result = await gModel.getGameInfo();
    res.json(result.rows)
});

module.exports = router;