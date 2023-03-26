const express = require("express");
const router = express.Router();
const query = require("../db/db.js");

const sql_str = "SELECT * FROM meibo";

router.get("/", function (req, res, next) {
  query(sql_str, function(data) {
    res.status(200).json({
      meibo: data,
    });
  });
});

module.exports = router;