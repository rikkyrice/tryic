const ibm_db = require("ibm_db");
const settings = require("../db/settings");

process.env.DB2CODEPAGE = 1208;

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

module.exports = function(sql_str, callback) {
  ibm_db.open( db_con_str, function( err, conn ){
    if( err ) console.log( err );
  
    conn.query( sql_str, function( err, data ){
      if (err) {
        throw err;
      }
      // console.log(data);
      callback(data);
    });
  });
}