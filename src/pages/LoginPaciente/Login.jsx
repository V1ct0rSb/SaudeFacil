import { useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import styles from "./Login.module.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState("")

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
      newErrors.senha =
        "Senha deve ter no mínimo 8 caracteres, incluindo números"

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
        alert("Login bem-sucedido!")
        // Redirecionar ou realizar outras ações após login bem-sucedido
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
      <Navbar />
      <main>
        <section className={styles.loginSection}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label htmlFor="email" className={styles["label-required"]}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              required
              value={formData.senha}
              onChange={handleChange}
            />
            {errors.senha && (
              <span className={styles.error}>{errors.senha}</span>
            )}

            {loginError && <span className={styles.error}>{loginError}</span>}

            <button type="submit">Entrar</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
