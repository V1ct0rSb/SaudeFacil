export const loginUsuario = (req, res) => {
  const { email, senha } = req.body

  const sql = "SELECT * FROM usuario WHERE email = ?"

  req.db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err)
      return res.status(500).json({ message: "Erro ao realizar login" })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const user = results[0]

    if (user.senha === senha) {
      res.status(200).json({ user }) // Retorna os dados do usuário
    } else {
      res.status(401).json({ message: "Senha incorreta" })
    }
  })
}
