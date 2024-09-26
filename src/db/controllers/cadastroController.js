export const cadastrarUsuario = (req, res) => {
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

  req.db.query(
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
}
