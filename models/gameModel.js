const pool = require('./connection.js');

module.exports.getGameInfo = async function(){
    try { 
        let sql = `SELECT * from game_connection`
        let result = await pool.query(sql);
        if (result.rows.length == 0 ){
            return {status: 200, result: {msg: ""}}
        }else{
            return {status: 400, result: {msg: "Cannot fetch game info"}}
        }
            
    } catch (err) {
        console.log(err);
        return{ status: 500, result: err}
    }
};