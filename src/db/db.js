import mysql from "mysql2"

const db = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "1234",
  database: "SistemaAutogestaoSaude",
})

export default db