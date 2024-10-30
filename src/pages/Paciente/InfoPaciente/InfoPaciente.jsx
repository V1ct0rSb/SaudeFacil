import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Footer from "../../../components/Footer/Footer"
import NavbarClean from "../../../components/NavbarClean/NavbarClean"
import { UserContext } from "../../../db/context/UserContext"
import styles from "./InfoPaciente.module.css"

function InfoPaciente() {
  const { user } = useContext(UserContext)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    data_nascimento: "",
    genero: "",
    telefone: "",
    peso: "",
    altura: "",
    tipo_sanguineo: "",
    cep: "",
    alergias: "",
    medicamentos: "",
  })

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3006/usuario/pacientes/${user.id}`)
        .then((response) => {
          const pacienteData = response.data

          // Formata a data de nascimento para o formato YYYY-MM-DD
          if (pacienteData.data_nascimento) {
            pacienteData.data_nascimento =
              pacienteData.data_nascimento.split("T")[0]
          }

          setForm(pacienteData)
        })
        .catch((error) => {
          console.error("Erro ao carregar paciente:", error)
        })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:3006/usuario/pacientes/${user.id}`, form)
      .then(() => {
        alert("Paciente atualizado com sucesso!")
      })
      .catch((error) => {
        console.error("Erro ao atualizar paciente:", error)
      })
  }

  if (!user) return <p>Carregando...</p>

  return (
    <>
      <NavbarClean />
      <main className={styles.InfoPacienteMain}>
        <div className={styles.InfoPaciente}>
          <h1>Editar Informações do Paciente</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              placeholder="Data de Nascimento"
            />
            <input
              type="text"
              name="genero"
              value={form.genero}
              onChange={handleChange}
              placeholder="Gênero"
            />
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Telefone"
            />
            <input
              type="number"
              name="peso"
              value={form.peso}
              onChange={handleChange}
              placeholder="Peso"
            />
            <input
              type="number"
              name="altura"
              value={form.altura}
              onChange={handleChange}
              placeholder="Altura"
            />
            <input
              type="text"
              name="tipo_sanguineo"
              value={form.tipo_sanguineo}
              onChange={handleChange}
              placeholder="Tipo Sanguíneo"
            />
            <input
              type="text"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              placeholder="CEP"
            />
            <input
              type="text"
              name="alergias"
              value={form.alergias}
              onChange={handleChange}
              placeholder="Alergias"
            />
            <input
              type="text"
              name="medicamentos"
              value={form.medicamentos}
              onChange={handleChange}
              placeholder="Medicamentos"
            />
            <button type="submit">Salvar Alterações</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default InfoPaciente
