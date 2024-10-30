import { useEffect, useState } from "react"
import { FaShareAlt, FaTrashAlt } from "react-icons/fa"
import Footer from "../../../components/Footer/Footer"
import NavbarClean from "../../../components/NavbarClean/NavbarClean"
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
    data_criacao: "",
  })

  const carregarSintomas = async () => {
    const usuarioId = localStorage.getItem("usuarioId")
    if (!usuarioId) return

    try {
      const response = await fetch(
        `http://localhost:3006/sintomas/${usuarioId}`
      )
      if (response.ok) {
        const data = await response.json()
        setSintomas(data)
      } else {
        console.error("Erro ao buscar sintomas")
      }
    } catch (error) {
      console.error("Erro ao buscar sintomas:", error)
    }
  }

  useEffect(() => {
    carregarSintomas()
  }, [])

  const formatarData = (dataISO) => {
    const data = new Date(dataISO)
    const dataComFusoHorario = new Date(
      data.getTime() + data.getTimezoneOffset() * 60000
    )
    return dataComFusoHorario.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatarDataHora = (dataISO) => {
    const data = new Date(dataISO)
    return (
      data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }

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

        setSintomas([
          ...sintomas,
          {
            ...sintomaAtual,
            id: data.id,
            data_criacao: new Date().toISOString(),
          },
        ])
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
        setSintomas(sintomas.filter((sintoma) => sintoma.id !== id))
      } else {
        console.error("Erro ao deletar sintoma")
      }
    } catch (error) {
      console.error("Erro ao deletar sintoma:", error)
    }
  }

  return (
    <>
      <NavbarClean />
      <main className={styles.homePacienteMain}>
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
              Adicionar Sintomas
            </button>
          </div>
          <h3>Sintomas Registrados</h3>
          <ul className={styles.list}>
            {sintomas.map((sintoma, index) => (
              <li key={index} className={styles.listItem}>
                <div className={styles.sintomaHeader}>
                  <span className={styles.sintomaTipo}>
                    {sintoma.tipo_sintoma}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Tem certeza que deseja deletar este sintoma?"
                        )
                      ) {
                        deletarSintoma(sintoma.id)
                      }
                    }}
                  >
                    <div className={styles.deleteButtonIcon}>
                      <FaTrashAlt />
                    </div>
                    <p>Deletar</p>
                  </button>
                </div>
                <div className={styles.sintomaContent}>
                  <p>
                    <strong>Intensidade:</strong> {sintoma.intensidade}
                  </p>
                  <p>
                    <strong>Localização:</strong> {sintoma.localizacao}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {sintoma.descricao}
                  </p>
                  <p>
                    <strong>Data de Início:</strong>{" "}
                    {formatarData(sintoma.data_sintoma)}
                  </p>
                  <p>
                    <strong>Data de Fim:</strong>{" "}
                    {formatarData(sintoma.data_fim_sintoma)}
                  </p>
                  <p>
                    <strong>Comentário:</strong> {sintoma.comentario}
                  </p>
                  <p>
                    <strong>Data de Registro:</strong>{" "}
                    {formatarDataHora(sintoma.data_criacao)}
                  </p>
                </div>
                <button
                  className={styles.shareButton}
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          text: `📋 Sintoma: ${sintoma.tipo_sintoma}
🔹 *Intensidade:* ${sintoma.intensidade}
🔹 *Localização:* ${sintoma.localizacao}
🔹 *Descrição:* ${sintoma.descricao}
🔹 *Data de Início:* ${formatarData(sintoma.data_sintoma)}
🔹 *Data de Fim:* ${formatarData(sintoma.data_fim_sintoma)}
🔹 *Comentário:* ${sintoma.comentario}
📅 *Data de Registro:* ${formatarDataHora(sintoma.data_criacao)}`,
                        })

                        .catch((error) =>
                          console.log("Erro ao compartilhar:", error)
                        )
                    } else {
                      alert("Compartilhamento não é suportado neste navegador.")
                    }
                  }}
                >
                  <FaShareAlt />
                  Compartilhar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CadastroSintomasPaciente
