import bannerVideo from "../../assets/banner.mp4"
import attractImg from "../../assets/img01.png"
import styles from "./Home.module.css"

import { BiSolidBellRing } from "react-icons/bi"
import { MdAppRegistration } from "react-icons/md"
import { TbReportAnalytics } from "react-icons/tb"
import Carrousel from "../../components/Carousel/Carousel"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
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

        <section className={styles.sectionAttractContainer} id="sobre">
          <div className={styles.sectionAttractText}>
            <h1>Seja o protagonista da sua saúde</h1>
            <p>
              Empodere-se no cuidado da sua saúde com nosso sistema de
              autogestão de sintomas. Monitore, compreenda e gerencie seus
              sintomas de forma prática e eficiente. Nossa plataforma foi
              desenvolvida para oferecer a você mais autonomia e confiança na
              sua jornada de saúde, permitindo que você tome decisões
              informadas, acompanhe o progresso ao longo do tempo e compartilhe
              dados com seus profissionais de saúde. Viva com mais qualidade de
              vida, sabendo que você está no controle do seu bem-estar.
            </p>
          </div>

          <div className={styles.sectionAttractImg}>
            <img src={attractImg} alt="Homem se defendendo de bacterias" />
          </div>
        </section>

        <section className={styles.sectionCharacterContainer} id="recursos">
          <h1>Principais Recursos</h1>
          <div className={styles.sectionCharacterBox}>
            {/* box01 */}
            <div className={styles.chareacterBox}>
              <div className={styles.iconBox}>
                <MdAppRegistration />
              </div>

              <div className={styles.textBox}>
                <h1>Registro Personalizado de Sintomas</h1>
                <p>
                  Oferece aos usuários a capacidade de registrar e monitorar
                  seus sintomas de forma detalhada, com entradas ajustáveis
                  conforme as necessidades individuais. Essa funcionalidade
                  permite acompanhar o progresso ao longo do tempo, auxiliando
                  na identificação de padrões de saúde.
                </p>
              </div>
            </div>

            {/* box02 */}
            <div className={styles.chareacterBox}>
              <div className={styles.iconBox}>
                <BiSolidBellRing />
              </div>

              <div className={styles.textBox}>
                <h1>Alertas e Lembretes</h1>
                <p>
                  Proporciona lembretes automáticos personalizados, garantindo
                  que os usuários não esqueçam de registrar seus sintomas ou
                  tomar medidas preventivas. Estes lembretes são configuráveis
                  de acordo com as preferências e horários do usuário,
                  assegurando um acompanhamento contínuo da saúde.
                </p>
              </div>
            </div>

            {/* box03 */}
            <div className={styles.chareacterBox}>
              <div className={styles.iconBox}>
                <TbReportAnalytics />
              </div>

              <div className={styles.textBox}>
                <h1>Geração de Relatórios Detalhados</h1>
                <p>
                  Oferece a capacidade de gerar relatórios completos baseadas
                  nos dados inseridos. Esses relatórios ajudam os usuários e
                  seus profissionais de saúde a compreenderem melhor as
                  condições de saúde, facilitando a tomada de decisões
                  informadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="depoimentos">
          <Carrousel />
        </section>
      </main>

      <Footer />
    </>
  )
}
