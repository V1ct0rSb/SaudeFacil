import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ImagemLogin from "../../assets/login.png"
import Footer from "../../components/Footer/Footer"
import NavbarClean from "../../components/NavbarClean/NavbarClean"
import { UserContext } from "../../db/context/UserContext"
import styles from "./Login.module.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState("")
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!formData.email) newErrors.email = "E-mail é obrigatório"
    else if (!emailRegex.test(formData.email))
      newErrors.email = "E-mail inválido"

    if (!formData.senha) newErrors.senha = "Senha é obrigatória"
    else if (!passwordRegex.test(formData.senha))
      newErrors.senha = "Senha deve ter no mínimo 8 caracteres"

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
      const response = await fetch("http://localhost:3006/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("usuarioId", data.user.id) // Armazena o ID do usuário no localStorage
        console.log("Login bem-sucedido:", data)
        console.log("Id Logado:", data.user.id)

        setUser(data.user) // Armazena as informações do usuário no contexto
        navigate("/HomePaciente")
      } else {
        setLoginError(data.message || "Erro ao realizar login")
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error)
      setLoginError("Erro ao realizar login")
    }
  }

  return (
    <>
      <NavbarClean />
      <main className={styles.mainContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={ImagemLogin}
            alt="Ilustração de uma pessoas correndo e tendo bons hábitos de saúde"
          />
        </div>

        <form
          className={styles.loginPacienteForm}
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
          role="form"
          aria-labelledby="login-title"
        >
          <h2 id="login-title" className={styles.titleForm}>
            Bem-vindo! <br />
            Entre para acessar sua conta
          </h2>

          <div className={styles.inputForm}>
            <label htmlFor="email" className={styles["label-required"]}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="SeuEmail@gmail.com"
              required
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="email-error"
            />
            {errors.email && (
              <span
                id="email-error"
                className={styles.error}
                aria-live="polite"
              >
                {errors.email}
              </span>
            )}

            <label htmlFor="senha" className={styles["label-required"]}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Sua Senha"
              required
              aria-required="true"
              value={formData.senha}
              onChange={handleChange}
              aria-describedby="senha-error"
            />
            {errors.senha && (
              <span
                id="senha-error"
                className={styles.error}
                aria-live="polite"
              >
                {errors.senha}
              </span>
            )}
            {loginError && (
              <span className={styles.error} aria-live="polite">
                {loginError}
              </span>
            )}
          </div>

          <div className={styles.buttonForm}>
            <button type="submit" aria-label="Entrar no sistema">
              Entrar
            </button>
            <div className={styles.registerLink}>
              <p>
                Não tem uma conta?{" "}
                <Link to="/CadastroPaciente">Cadastre-se aqui</Link>
              </p>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
