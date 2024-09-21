import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import mysql from "mysql2"

const app = express()
const port = 3006

// Middleware para habilitar CORS
app.use(cors({ origin: "http://localhost:5173" }))
app.use(bodyParser.json())

// Configuração do banco de dados
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

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

// Rota para cadastrar usuário
app.post("/cadastro", (req, res) => {
  const {
    nome,
    email,
    senha,
    data_nascimento,
    genero,
    telefone,
    peso,
    altura,
    tipo_sanguineo,
    cep,
    alergias,
    medicamentos,
  } = req.body

  const sql = `INSERT INTO usuario (nome, email, senha, data_nascimento, genero, telefone, peso, altura, tipo_sanguineo, cep, alergias, medicamentos)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(
    sql,
    [
      nome,
      email,
      senha,
      data_nascimento,
      genero,
      telefone,
      peso,
      altura,
      tipo_sanguineo,
      cep,
      alergias,
      medicamentos,
    ],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ error: "O e-mail já está cadastrado no sistema." })
        }
        console.error("Erro ao cadastrar Usuario:", err)
        return res.status(500).json({ message: "Erro ao cadastrar Usuario" })
      }
      res.status(200).json({ message: "Usuario cadastrado com sucesso!" })
    }
  )
})

// Rota para login de usuário
app.post("/login", (req, res) => {
  const { email, senha } = req.body

  // Query para buscar o usuário pelo e-mail
  const sql = "SELECT * FROM usuario WHERE email = ?"
  
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err)
      return res.status(500).json({ message: "Erro ao realizar login" })
    }

    if (results.length === 0) {
      // Se o usuário não for encontrado
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const user = results[0]

    // Comparando a senha fornecida com a senha armazenada
    if (user.senha === senha) {
      res.status(200).json({ message: "Login realizado com sucesso" })
    } else {
      res.status(401).json({ message: "Senha incorreta" })
    }
  })
})
