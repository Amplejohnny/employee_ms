import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_ms",
});

db.connect(function (err) {
  if (err) {
    console.log("connection error");
  } else {
    console.log("Connected to Database");
  }
});

export default db;
