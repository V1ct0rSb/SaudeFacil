import { useContext } from "react"
import { Link } from "react-router-dom"
import NavbarClean from "../../../components/NavbarClean/NavbarClean"
import { UserContext } from "../../../db/context/UserContext"
import styles from "./HomePaciente.module.css"

function HomePaciente() {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavbarClean />
      <div>
        <h1>Bem-vindo, {user ? user.nome : "sem nome"}!</h1>
      </div>
      <div className={styles.registerLink}>
        <p>
          cadastre os sintomas?{" "}
          <Link to="/CadastroSintomasPaciente">Cadastre-se aqui</Link>
        </p>
      </div>
    </>
  )
}

export default HomePaciente
