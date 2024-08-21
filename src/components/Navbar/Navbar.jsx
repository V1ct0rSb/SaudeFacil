import { MdAccountCircle } from "react-icons/md"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoHeader}>
        <Link to="/" className={styles.logoLinkHeader}>
          <img src="../src/assets/LG-suadeFacilTransparente.png" alt="Logo SaúdeFácil" />
        </Link>
      </div>

      <nav className={styles.navLinksContainer}>
        <Link to="/sintomas" className={styles.navLink}>
          Sintomas
        </Link>
        <Link to="/sobre" className={styles.navLink}>
          Sobre
        </Link>
        <Link to="/contato" className={styles.navLink}>
          Contato
        </Link>
      </nav>
      
      <div className={styles.loginIconHeader}>
        <Link to="/">
          <MdAccountCircle className={styles.loginIcon} />
        </Link>
      </div>
    </header>
  )
}

export default Navbar
