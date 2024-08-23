import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.socialMedia}>
          <h2>Redes Sociais</h2>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className={styles.contactUs}>
          <h2>Contato</h2>
          <p>Email: contato@saudefacil.com</p>
          <p>Telefone: (79) 1234-5678</p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 SaúdeFácil. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
