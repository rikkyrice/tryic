const express = require("express");
const router = express.Router();
const ibm_db = require("ibm_db");
const settings = require("./settings");

const db_con_str =
"DRIVER={DB2}"
  + ";DATABASE=" + settings.dbname
  + ";HOSTNAME=" + settings.host
  + ";PORT=" + settings.port
  + ";PROTOCOL=TCPIP"
  + ";UID=" + settings.username
  + ";PWD=" + settings.password
  + ";Security=SSL"
;

const sql_str = "SELECT * FROM meibo";

router.get("/", function (req, res, next) {
  console.log("pass");
  ibm_db.open( db_con_str, function( err, conn ){
    if( err ) console.log( err );

    console.log(res.rows);
  
    conn.query( sql_str, function( err, data ){
      if (err) {
        throw err;
      }
      res.status(200).json({
        meibo: data,
      });
    });
  });
});

module.exports = router;