
export const cadastrarLembrete = (req, res) => {
  const { usuario_id, titulo, descricao, data_lembrete, status, tipo } =
    req.body

  const sql = `
    INSERT INTO lembrete (usuario_id, titulo, descricao, data_lembrete, status, tipo)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  req.db.query(
    sql,
    [usuario_id, titulo, descricao, data_lembrete, status, tipo],
    (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar lembrete:", err)
        return res.status(500).json({ message: "Erro ao cadastrar lembrete" })
      }

      res.status(200).json({
        message: "Lembrete cadastrado com sucesso",
        id: results.insertId,
      })
    }
  )
}

export const deletarLembrete = (req, res) => {
  const { id } = req.params

  const sql = `DELETE FROM lembrete WHERE id = ?`

  req.db.query(sql, [id], (err) => {
    if (err) {
      console.error("Erro ao deletar lembrete:", err)
      return res.status(500).json({ message: "Erro ao deletar lembrete" })
    }

    res.status(200).json({ message: "Lembrete deletado com sucesso" })
  })
}

export const obterLembretePorUsuario = (req, res) => {
  const { usuario_id } = req.params

  const sql = `SELECT * FROM lembrete WHERE usuario_id = ?`

  req.db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar lembrete:", err)
      return res.status(500).json({ message: "Erro ao buscar lembrete" })
    }

    res.status(200).json(results)
  })
}
