import { useEffect, useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { TfiAgenda } from "react-icons/tfi"
import Footer from "../../../components/Footer/Footer"
import NavbarClean from "../../../components/NavbarClean/NavbarClean"
import styles from "./CadastroLembretes.module.css"

const CadastroLembretes = () => {
  const [lembretes, setLembretes] = useState([])
  const [lembreteAtual, setLembreteAtual] = useState({
    titulo: "",
    descricao: "",
    data_lembrete: "",
    status: "",
    tipo: "",
  })

  const carregarLembretes = async () => {
    const usuarioId = localStorage.getItem("usuarioId")
    if (!usuarioId) return

    try {
      const response = await fetch(
        `http://localhost:3006/lembretes/${usuarioId}`
      )
      if (response.ok) {
        const data = await response.json()
        setLembretes(data)
      } else {
        console.error("Erro ao buscar lembretes")
      }
    } catch (error) {
      console.error("Erro ao buscar lembretes:", error)
    }
  }

  const atualizarStatusLembretes = async () => {
    try {
      await fetch("http://localhost:3006/lembretes/atualizarStatus", {
        method: "POST",
      })
      carregarLembretes()
    } catch (error) {
      console.error("Erro ao atualizar status dos lembretes:", error)
    }
  }

  useEffect(() => {
    carregarLembretes()
    atualizarStatusLembretes()

    const intervalId = setInterval(atualizarStatusLembretes, 60000)
    return () => clearInterval(intervalId)
  }, [])

  const handleLembreteChange = (e) => {
    const { name, value } = e.target
    setLembreteAtual({ ...lembreteAtual, [name]: value })
  }

  const adicionarLembrete = async () => {
    const usuarioId = localStorage.getItem("usuarioId")

    try {
      const response = await fetch(
        "http://localhost:3006/lembretes/cadastrar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...lembreteAtual,
            usuario_id: usuarioId,
            status: "Ativo",
          }),
        }
      )

      if (response.ok) {
        setLembreteAtual({
          titulo: "",
          descricao: "",
          data_lembrete: "",
          status: "",
          tipo: "",
        })
        await atualizarStatusLembretes()
        await carregarLembretes()
      } else {
        console.error("Erro ao cadastrar lembrete")
      }
    } catch (error) {
      console.error("Erro ao cadastrar lembrete:", error)
    }
  }

  const deletarLembrete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/lembretes/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setLembretes(lembretes.filter((lembrete) => lembrete.id !== id))
      } else {
        console.error("Erro ao deletar lembrete")
      }
    } catch (error) {
      console.error("Erro ao deletar lembrete:", error)
    }
  }

  const formatarDataParaGoogle = (data) => {
    const dataObj = new Date(data)
    return dataObj.toISOString().replace(/-|:|\.\d\d\d/g, "")
  }

  const gerarLinkGoogleCalendar = (lembrete) => {
    const dataInicio = formatarDataParaGoogle(lembrete.data_lembrete)
    const dataFim = formatarDataParaGoogle(lembrete.data_lembrete)
    const titulo = encodeURIComponent(lembrete.titulo)
    const descricao = encodeURIComponent(lembrete.descricao)
    return `https://calendar.google.com/calendar/r/eventedit?dates=${dataInicio}/${dataFim}&text=${titulo}&details=${descricao}`
  }

  return (
    <>
      <NavbarClean />
      <main className={styles.homePacienteMain}>
        <div className={styles.container}>
          <h2>Cadastro de Lembretes</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título</label>
            <input
              className={styles.inputField}
              type="text"
              name="titulo"
              value={lembreteAtual.titulo}
              onChange={handleLembreteChange}
            />
            <label className={styles.label}>Descrição</label>
            <textarea
              className={styles.textArea}
              name="descricao"
              value={lembreteAtual.descricao}
              onChange={handleLembreteChange}
            />
            <label className={styles.label}>Data do Lembrete</label>
            <input
              className={styles.inputField}
              type="date"
              name="data_lembrete"
              value={lembreteAtual.data_lembrete}
              onChange={handleLembreteChange}
            />

            <label className={styles.label}>Tipo</label>
            <select
              className={styles.inputField}
              name="tipo"
              value={lembreteAtual.tipo}
              onChange={handleLembreteChange}
            >
              <option value="">Selecione</option>
              <option value="Medicamento">Medicamento</option>
              <option value="Consulta">Consulta</option>
              <option value="Exame">Exame</option>
              <option value="Outro">Outro</option>
            </select>
            <button className={styles.button} onClick={adicionarLembrete}>
              Adicionar Lembrete
            </button>
          </div>
          <h3>Lembretes Registrados</h3>
          <ul className={styles.list}>
            {lembretes.map((lembrete, index) => (
              <li key={index} className={styles.listItem}>
                <div className={styles.lembreteHeader}>
                  <span className={styles.lembreteTitulo}>
                    {lembrete.titulo}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Tem certeza que deseja deletar este sintoma?"
                        )
                      ) {
                        deletarLembrete(lembrete.id)
                      }
                    }}
                  >
                    <div className={styles.deleteButtonIcon}>
                      <FaTrashAlt />
                    </div>
                    <p>Deletar</p>
                  </button>
                </div>
                <div className={styles.lembreteContent}>
                  <p>
                    <strong>Descrição:</strong> {lembrete.descricao}
                  </p>
                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(lembrete.data_lembrete).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {lembrete.status}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {lembrete.tipo}
                  </p>
                  <button className={styles.googleCalendarLink}>
                    <a
                      href={gerarLinkGoogleCalendar(lembrete)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.googleCalendarIcon}>
                        <TfiAgenda />
                      </div>
                      <p>Adicionar ao Google Calendar</p>
                    </a>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CadastroLembretes
