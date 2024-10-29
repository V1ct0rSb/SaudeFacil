import { useContext } from "react"
import { FaUser } from "react-icons/fa"
import { FaHospitalUser } from "react-icons/fa6"
import { IoIosExit, IoMdNotifications } from "react-icons/io"
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import Footer from "../../../components/Footer/Footer"
import NavbarClean from "../../../components/NavbarClean/NavbarClean"
import { UserContext } from "../../../db/context/UserContext"
import styles from "./HomePaciente.module.css"

function HomePaciente() {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavbarClean />
      <main className={styles.homeMain}>
        <div className={styles.welcomeSection}>
          <h1>Bem-vindo, {user ? user.nome : "sem nome"}!</h1>
          <p>Selecione uma das opções abaixo</p>
        </div>

        <div className={styles.selectButtonContainer}>
          <div className={styles.selectButton}>
            <Link to="/CadastroSintomasPaciente">
              <button>
                <div className={styles.selectButtonIcon}>
                  <MdAdd />
                </div>
                <p>Cadastrar Sintomas</p>
              </button>
            </Link>
          </div>
          <div className={styles.selectButton}>
            <Link to="/CadastroSintomasPaciente">
              <button>
                <div className={styles.selectButtonIcon}>
                  <IoMdNotifications />
                </div>
                <p>Cadastrar Lembretes</p>
              </button>
            </Link>
          </div>
          <div className={styles.selectButton}>
            <Link to="/DiagnosticoPrevio">
              <button>
                <div className={styles.selectButtonIcon}>
                  <FaHospitalUser />
                </div>
                <p>Diagnóstico Prévio</p>
              </button>
            </Link>
          </div>
          <div className={styles.selectButton}>
            <Link to="/CadastroSintomasPaciente">
              <button>
                <div className={styles.selectButtonIcon}>
                  <FaUser />
                </div>
                <p>Informações do Paciente</p>
              </button>
            </Link>
          </div>

          <div id={styles.selectButton}>
            <Link to="/">
              <button>
                <div id={styles.selectButtonIcon}>
                  <IoIosExit />
                </div>
                <p>Sair</p>
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default HomePaciente
