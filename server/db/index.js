const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "bs",
  host: "localhost",
  port: 5432,
  database: "bs"
});

module.exports = {
  querry: (text, params) => pool.query(text, params)
}