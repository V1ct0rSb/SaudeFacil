import { useState } from "react"
import Footer from "../../components/Footer/Footer"
import NavbarClean from "../../components/NavbarClean/NavbarClean"
import styles from "./CadastroPaciente.module.css"

export default function CadastroPaciente() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    data_nascimento: "",
    genero: "Masculino",
    telefone: "",
    peso: "",
    altura: "",
    tipo_sanguineo: "",
    cep: "",
    alergias: "",
    medicamentos: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!formData.nome) newErrors.nome = "Nome é obrigatório"
    if (!formData.email) newErrors.email = "E-mail é obrigatório"
    else if (!emailRegex.test(formData.email))
      newErrors.email = "E-mail inválido"

    if (!formData.senha) newErrors.senha = "Senha é obrigatória"
    else if (!passwordRegex.test(formData.senha))
      newErrors.senha =
        "Senha deve ter no mínimo 8 caracteres, incluindo números"

    if (!formData.data_nascimento)
      newErrors.data_nascimento = "Data de nascimento é obrigatória"
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório"
    if (!formData.peso) newErrors.peso = "Peso é obrigatório"
    if (!formData.altura) newErrors.altura = "Altura é obrigatória"
    if (!formData.tipo_sanguineo)
      newErrors.tipo_sanguineo = "Tipo sanguíneo é obrigatório"
    if (!formData.cep) newErrors.cep = "CEP é obrigatório"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const response = await fetch("http://localhost:3006/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!")
        setFormData({
          nome: "",
          email: "",
          senha: "",
          data_nascimento: "",
          genero: "Masculino",
          telefone: "",
          peso: "",
          altura: "",
          tipo_sanguineo: "",
          cep: "",
          alergias: "",
          medicamentos: "",
        })
        setErrors({})
      } else if (response.status === 409) {
        const data = await response.json()
        setErrors({ email: data.error || "Erro: E-mail já cadastrado." })
      } else {
        alert("Erro ao cadastrar usuário.")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao cadastrar usuário.")
    }
  }

  return (
    <>
      <NavbarClean />
      <main className={styles.cadastroPacienteMain}>
        <section>
          <form className={styles.cadastroPacienteForm} onSubmit={handleSubmit}>
            {/* Seção de Login */}
            <div className={styles.section}>
              <h2>Dados de Login</h2>

              <label htmlFor="email" className={styles["label-required"]}>
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@meuemail.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}

              <label htmlFor="senha" className={styles["label-required"]}>
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Sua senha"
                required
                value={formData.senha}
                onChange={handleChange}
              />
              {errors.senha && (
                <span className={styles.error}>{errors.senha}</span>
              )}
            </div>

            {/* Seção de Dados Pessoais */}
            <div className={styles.section}>
              <h2>Dados Pessoais</h2>

              <label htmlFor="nome" className={styles["label-required"]}>
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="João da Silva Pereira de Souza"
                required
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && (
                <span className={styles.error}>{errors.nome}</span>
              )}

              <label
                htmlFor="dataNascimento"
                className={styles["label-required"]}
              >
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNascimento"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
              />
              {errors.data_nascimento && (
                <span className={styles.error}>{errors.data_nascimento}</span>
              )}

              <label htmlFor="telefone" className={styles["label-required"]}>
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="12123456789"
                value={formData.telefone}
                onChange={handleChange}
              />
              {errors.telefone && (
                <span className={styles.error}>{errors.telefone}</span>
              )}

              <label htmlFor="cep" className={styles["label-required"]}>
                CEP
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
              />
              {errors.cep && <span className={styles.error}>{errors.cep}</span>}
            </div>

            {/* Seção de Informações de Saúde */}
            <div className={styles.section}>
              <h2>Informações de Saúde</h2>

              <label htmlFor="peso" className={styles["label-required"]}>
                Peso
              </label>
              <input
                type="number"
                id="peso"
                name="peso"
                step="0.01"
                placeholder="Ex: 65.5"
                value={formData.peso}
                onChange={handleChange}
              />
              {errors.peso && (
                <span className={styles.error}>{errors.peso}</span>
              )}

              <label htmlFor="altura" className={styles["label-required"]}>
                Altura
              </label>
              <input
                type="number"
                id="altura"
                name="altura"
                placeholder="Ex: 1.75"
                step="0.01"
                value={formData.altura}
                onChange={handleChange}
              />
              {errors.altura && (
                <span className={styles.error}>{errors.altura}</span>
              )}

              <label
                htmlFor="tipoSanguineo"
                className={styles["label-required"]}
              >
                Tipo Sanguíneo
              </label>
              <select
                name="tipo_sanguineo"
                id="tipoSanguineo"
                value={formData.tipo_sanguineo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.tipo_sanguineo && (
                <span className={styles.error}>{errors.tipo_sanguineo}</span>
              )}
            </div>

            {/* Seção de Informações Adicionais */}
            <div className={styles.section}>
              <h2>Informações Adicionais</h2>

              <label htmlFor="alergias">Alergias</label>
              <textarea
                id="alergias"
                name="alergias"
                placeholder="Ex: Alergia a penicilina"
                value={formData.alergias}
                onChange={handleChange}
              ></textarea>

              <label htmlFor="medicamentos">Medicamentos</label>
              <textarea
                id="medicamentos"
                name="medicamentos"
                placeholder="Ex: Paracetamol"
                value={formData.medicamentos}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
