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

// buscar informações do paciente
export const obterPaciente = (req, res) => {
  const { id } = req.params

  const sql = `SELECT nome, email, data_nascimento, genero, telefone, peso, altura, tipo_sanguineo, cep, alergias, medicamentos 
               FROM usuario 
               WHERE id = ?`

  req.db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar informações do paciente:", err)
      return res
        .status(500)
        .json({ message: "Erro ao buscar informações do paciente" })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Paciente não encontrado" })
    }

    res.status(200).json(results[0])
  })
}

// Atualizar informações do paciente
export const atualizarPaciente = (req, res) => {
  const { id } = req.params
  const fields = req.body

  if (fields.data_nascimento) {
    fields.data_nascimento = new Date(fields.data_nascimento)
      .toISOString()
      .split("T")[0]
  }

  const columns = Object.keys(fields)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = Object.values(fields)

  if (!columns) {
    return res.status(400).json({ message: "Nenhum campo para atualizar" })
  }

  const sql = `UPDATE usuario SET ${columns} WHERE id = ?`
  values.push(id)

  req.db.query(sql, values, (err) => {
    if (err) {
      console.error("Erro ao atualizar informações do paciente:", err)
      return res
        .status(500)
        .json({ message: "Erro ao atualizar informações do paciente" })
    }

    res.status(200).json({ message: "Paciente atualizado com sucesso!" })
  })
}
