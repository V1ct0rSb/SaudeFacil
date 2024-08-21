import bannerVideo from "../../assets/banner.mp4"
import styles from "./Home.module.css"

export default function Home() {
  return (
    <main>
      <section>
        <div className={styles.bannerContainer}>
          <video autoPlay loop muted className={styles.bannerVideo}>
            <source src={bannerVideo} type="video/mp4" />
            {/* Fallback para navegadores que não suportam vídeo */}
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className={styles.bannerContent}>
            <h1>
              Seu bem-estar nas suas mãos. <br />
              Registre seus sintomas e os compartilhe com seu médico.
            </h1>
            <button>Saiba mais</button>
          </div>
        </div>
      </section>

      <section>
        <h1>teste</h1>
      </section>
    </main>
  )
}
