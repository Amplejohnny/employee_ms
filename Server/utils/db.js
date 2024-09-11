import mysql from "mysql";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error while connecting to database:", err.message);
  }
  if (connection) connection.release();
  console.log("Database connected");
  return;
});

export { db };