export const cadastrarSintoma = (req, res) => {
  const {
    usuario_id,
    tipo_sintoma,
    descricao,
    intensidade,
    localizacao,
    data_sintoma,
    data_fim_sintoma,
    comentario,
  } = req.body

  const sql = `
    INSERT INTO sintomas (usuario_id, tipo_sintoma, descricao, intensidade, localizacao, data_sintoma, data_fim_sintoma, comentario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  req.db.query(
    sql,
    [
      usuario_id,
      tipo_sintoma,
      descricao,
      intensidade,
      localizacao,
      data_sintoma,
      data_fim_sintoma,
      comentario,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar sintoma:", err)
        return res.status(500).json({ message: "Erro ao cadastrar sintoma" })
      }

      res.status(200).json({
        message: "Sintoma cadastrado com sucesso",
        id: results.insertId,
      })
    }
  )
}

export const deletarSintoma = (req, res) => {
  const { id } = req.params

  const sql = `DELETE FROM Sintomas WHERE id = ?`

  req.db.query(sql, [id], (err) => {
    if (err) {
      console.error("Erro ao deletar sintoma:", err)
      return res.status(500).json({ message: "Erro ao deletar sintoma" })
    }

    res.status(200).json({ message: "Sintoma deletado com sucesso" })
  })
}

export const obterSintomasPorUsuario = (req, res) => {
  const { usuario_id } = req.params

  const sql = `SELECT * FROM sintomas WHERE usuario_id = ?`

  req.db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar sintomas:", err)
      return res.status(500).json({ message: "Erro ao buscar sintomas" })
    }

    res.status(200).json(results)
  })
}
