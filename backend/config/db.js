const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "mini_crm",
});

db.connect((err) => {
  if (err) {
    console.log("Database Error");
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;