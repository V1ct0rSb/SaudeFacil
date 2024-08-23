import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import homem01 from "../../assets/homem01.png"
import homem02 from "../../assets/homem02.png"
import mulher01 from "../../assets/mulher01.png"
import mulher02 from "../../assets/mulher02.png"
import styles from "./Carousel.module.css"

function Carousel() {
  const testimonials = [
    {
      id: "1",
      image: homem01,
      text: "Eu estava um pouco cético no começo, mas o sistema realmente me surpreendeu. É intuitivo, fácil de usar, e realmente me ajuda a ter uma visão mais clara da minha saúde ao longo do tempo. O que eu mais gosto é a possibilidade de gerar relatórios para levar nas consultas médicas. Isso facilita muito a comunicação com meu médico, e ele consegue ter uma ideia mais precisa do meu histórico de sintomas.",
      name: "Paulo",
    },
    {
      id: "2",
      image: homem02,
      text: "O sistema de autogestão de sintomas é uma ferramenta indispensável para quem, como eu, lida com condições crônicas. A possibilidade de gerenciar meus sintomas e ter acesso a um histórico detalhado em um só lugar é um grande diferencial. As funcionalidades de lembretes e acompanhamento me ajudam a ser mais disciplinado com meu tratamento, o que tem feito uma grande diferença na minha qualidade de vida.",
      name: "João",
    },
    {
      id: "3",
      image: mulher01,
      text: "Sempre tive dificuldade em manter um registro consistente dos meus sintomas, mas com este sistema ficou muito mais fácil. Eu posso registrar tudo em poucos segundos, e a interface é muito amigável.",
      name: "Mariana",
    },
    {
      id: "4",
      image: mulher02,
      text: "O sistema de autogestão de sintomas tem sido uma verdadeira mudança de vida para mim. Antes, eu tinha dificuldades para acompanhar meus sintomas diários e entender o que poderia estar causando minhas crises. Agora, consigo registrar tudo de forma rápida e fácil, me ajudaramm a identificar padrões que eu não percebia antes.",
      name: "Ana",
    },
  ]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Depoimentos de Clientes
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className={styles.swiperContainer}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.slideItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.testimonialImage}
              />
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>{item.text}</p>
                <p className={styles.testimonialName}>- {item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
