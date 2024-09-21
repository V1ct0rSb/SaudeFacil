import { MdAccountCircle } from "react-icons/md"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoHeader}>
        <Link to="/LoginPaciente" className={styles.logoLinkHeader}>
          <img src={logo} alt="Logo SaúdeFácil" />
        </Link>
      </div>

      <nav className={styles.navLinksContainer}>
        <a href="#sobre" className={styles.navLink}>
          Sobre
        </a>
        <a href="#recursos" className={styles.navLink}>
          Recursos
        </a>
        <a href="#depoimentos" className={styles.navLink}>
          Depoimentos
        </a>
      </nav>

      <div className={styles.loginIconHeader}>
        <Link to="/CadastroPaciente">
          <MdAccountCircle className={styles.loginIcon} />
        </Link>
      </div>
    </header>
  )
}

export default Navbar
