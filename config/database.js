const mysql = require("mysql");
const pool = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
  connectionLimit: 10,
});
// pool.acquireConnection(function (err) {
//   if (err) throw err;
//   console.log("Database is connected successfully !");
// });

module.exports = pool;
