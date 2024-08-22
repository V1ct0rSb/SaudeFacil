import bannerVideo from "../../assets/banner.mp4"
import attractImg from "../../assets/img01.png"
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

      <section className={styles.sectionAttractContainer}>
        <div className={styles.sectionAttractText}>
          <h1>Seja o protagonista da sua saúde</h1>
          <p>
            Empodere-se no cuidado da sua saúde com nosso sistema de autogestão
            de sintomas. <br />
            Monitore, compreenda e gerencie seus sintomas de forma prática e
            eficiente. Tenha mais autonomia e confiança na sua jornada de saúde,
            tomando decisões informadas e vivendo com mais qualidade de vida.
            Seja protagonista do seu bem-estar!
          </p>
        </div>

        <div className={styles.sectionAttractImg}>
          <img src={attractImg} alt="Homem se defendendo de bacterias" />
        </div>
      </section>
    </main>
  )
}
