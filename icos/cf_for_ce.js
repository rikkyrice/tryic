/**
  *
  * main() このアクションを呼び出すときに実行されます
  *
  * @param Cloud Functions アクションは 1 つのパラメーターを受け入れます。このパラメーターは JSON オブジェクトでなければなりません。
  *
  * @return このアクションの出力。この出力は、JSON オブジェクトでなければなりません。
  *
  */
var ibm_db = require("ibm_db");

process.env.DB2CODEPAGE = 1208;

function main(params) {
  const db_con_str =
    "DRIVER={DB2}"
      + ";DATABASE=bludb"
      + ";HOSTNAME=b1bc1829-6f45-4cd4-bef4-10cf081900bf.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud"
      + ";PORT=32304"
      + ";PROTOCOL=TCPIP"
      + ";UID=hky06906"
      + ";PWD=gSQEtVnlRJQsCZHL"
      + ";Security=SSL"
    ;
  
  const sql_str = "SELECT * FROM meibo";

  try {
    var conn = ibm_db.openSync(db_con_str);
    var stmt = conn.prepareSync(sql_str);
    var result = stmt.executeSync([]);
    var data = result.fetchAllSync();
    result.closeSync();
    stmt.closeSync();
    conn.closeSync();
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          meibo: data
        }
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: {
          error: e.message
      }
    };
  }
}
exports.main = main;
