const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "#Gravityhurts12",
  host: "localhost",
  port: 5432,
  database: "bs"
});

module.exports = {
  querry: (text, params) => pool.query(text, params)
}