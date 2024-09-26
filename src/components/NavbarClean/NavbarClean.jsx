import { MdAccountCircle } from "react-icons/md"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./NavbarClean.module.css"

function Navbar() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoHeader}>
        <Link to="/" className={styles.logoLinkHeader}>
          <img src={logo} alt="Logo SaúdeFácil" />
        </Link>
      </div>

      <div className={styles.loginIconHeader}>
        <Link to="/LoginPaciente">
          <MdAccountCircle className={styles.loginIcon} />
        </Link>
      </div>
    </header>
  )
}

export default Navbar
