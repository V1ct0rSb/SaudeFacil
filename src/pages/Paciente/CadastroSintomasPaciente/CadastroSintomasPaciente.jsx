import { useEffect, useState } from "react"
import styles from "./CadastroSintomasPaciente.module.css"

const CadastroSintomasPaciente = () => {
  const [sintomas, setSintomas] = useState([])
  const [sintomaAtual, setSintomaAtual] = useState({
    tipo_sintoma: "",
    descricao: "",
    intensidade: "",
    localizacao: "",
    data_sintoma: "",
    data_fim_sintoma: "",
    comentario: "",
  })

  // Função para carregar os sintomas do paciente ao carregar a página
  const carregarSintomas = async () => {
    const usuarioId = localStorage.getItem("usuarioId")
    if (!usuarioId) return

    try {
      const response = await fetch(
        `http://localhost:3006/sintomas/${usuarioId}`
      )
      if (response.ok) {
        const data = await response.json()
        setSintomas(data) // Atualiza o estado com os sintomas registrados
      } else {
        console.error("Erro ao buscar sintomas")
      }
    } catch (error) {
      console.error("Erro ao buscar sintomas:", error)
    }
  }

  // UseEffect para carregar os sintomas ao montar o componente
  useEffect(() => {
    carregarSintomas()
  }, [])

  const handleSintomaChange = (e) => {
    const { name, value } = e.target
    setSintomaAtual({ ...sintomaAtual, [name]: value })
  }

  const adicionarSintoma = async () => {
    const usuarioId = localStorage.getItem("usuarioId")

    try {
      const response = await fetch("http://localhost:3006/sintomas/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...sintomaAtual, usuario_id: usuarioId }),
      })

      if (response.ok) {
        const data = await response.json()
        setSintomas([...sintomas, { ...sintomaAtual, id: data.id }]) // Adiciona o novo sintoma
        setSintomaAtual({
          tipo_sintoma: "",
          descricao: "",
          intensidade: "",
          localizacao: "",
          data_sintoma: "",
          data_fim_sintoma: "",
          comentario: "",
        })
      } else {
        console.error("Erro ao cadastrar sintoma")
      }
    } catch (error) {
      console.error("Erro ao cadastrar sintoma:", error)
    }
  }

  const deletarSintoma = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/sintomas/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSintomas(sintomas.filter((sintoma) => sintoma.id !== id)) // Remove o sintoma deletado
      } else {
        console.error("Erro ao deletar sintoma")
      }
    } catch (error) {
      console.error("Erro ao deletar sintoma:", error)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Cadastro de Sintomas</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>Tipo de Sintoma</label>
        <select
          className={styles.inputField}
          name="tipo_sintoma"
          value={sintomaAtual.tipo_sintoma}
          onChange={handleSintomaChange}
        >
          <option value="">Selecione</option>
          <option value="Dor">Dor</option>
          <option value="Febre">Febre</option>
          <option value="Cansaço">Cansaço</option>
          <option value="Náusea">Náusea</option>
          <option value="Tosse">Tosse</option>
          <option value="Dificuldade Respiratória">
            Dificuldade Respiratória
          </option>
          <option value="Vômito">Vômito</option>
          <option value="Outros">Outros</option>
        </select>

        <label className={styles.label}>Descrição</label>
        <textarea
          className={styles.textArea}
          name="descricao"
          value={sintomaAtual.descricao}
          onChange={handleSintomaChange}
        />

        <label className={styles.label}>Intensidade</label>
        <select
          className={styles.inputField}
          name="intensidade"
          value={sintomaAtual.intensidade}
          onChange={handleSintomaChange}
        >
          <option value="">Selecione</option>
          <option value="Leve">Leve</option>
          <option value="Moderada">Moderada</option>
          <option value="Severa">Severa</option>
          <option value="Muito Severa">Muito Severa</option>
        </select>

        <label className={styles.label}>Localização</label>
        <input
          className={styles.inputField}
          type="text"
          name="localizacao"
          value={sintomaAtual.localizacao}
          onChange={handleSintomaChange}
        />

        <label className={styles.label}>Data do Sintoma</label>
        <input
          className={styles.inputField}
          type="date"
          name="data_sintoma"
          value={sintomaAtual.data_sintoma}
          onChange={handleSintomaChange}
        />

        <label className={styles.label}>Data de Fim do Sintoma</label>
        <input
          className={styles.inputField}
          type="date"
          name="data_fim_sintoma"
          value={sintomaAtual.data_fim_sintoma}
          onChange={handleSintomaChange}
        />

        <label className={styles.label}>Comentário</label>
        <textarea
          className={styles.textArea}
          name="comentario"
          value={sintomaAtual.comentario}
          onChange={handleSintomaChange}
        />

        <button className={styles.button} onClick={adicionarSintoma}>
          Adicionar Sintoma
        </button>
      </div>

      <h3>Sintomas Registrados</h3>
      <ul className={styles.list}>
        {sintomas.map((sintoma, index) => (
          <li key={index} className={styles.listItem}>
            {sintoma.tipo_sintoma} - {sintoma.descricao} - {sintoma.intensidade}{" "}
            - {sintoma.localizacao} - {sintoma.data_sintoma} -{" "}
            {sintoma.data_fim_sintoma}
            <br />
            Comentário: {sintoma.comentario}
            <button
              className={styles.deleteButton}
              onClick={() => deletarSintoma(sintoma.id)}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CadastroSintomasPaciente
