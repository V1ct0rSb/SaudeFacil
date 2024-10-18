import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import mysql from "mysql2"
import cadastroRoutes from "./src/db/routes/cadastro.js"
import loginRoutes from "./src/db/routes/login.js"
import sintomasRoutes from "./src/db/routes/sintomas.js"
import lembretesRoutes from "./src/db/routes/lembretes.js"

const app = express()
const port = 3006

app.use(cors({ origin: "http://localhost:5173" }))
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "1234",
  database: "SistemaAutogestaoSaude",
})

db.connect((err) => {
  if (err) throw err
  console.log("Conectado ao banco de dados.")
})

// Middleware para adicionar a conexão do banco de dados ao objeto de solicitação
app.use((req, res, next) => {
  req.db = db
  next()
})

app.use(cadastroRoutes)
app.use(loginRoutes)
app.use(bodyParser.json())
app.use("/sintomas", sintomasRoutes)
app.use("/lembretes", lembretesRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})