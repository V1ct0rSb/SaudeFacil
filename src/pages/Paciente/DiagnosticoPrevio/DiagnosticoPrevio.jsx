import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../../../db/context/UserContext"
import styles from "./DiagnosticoPrevio.module.css"

import opencage from "opencage-api-client"

// Perguntas
const perguntas = [
  { id: 1, texto: "Você está com febre?", opcoes: ["Sim", "Não"] },
  { id: 2, texto: "Sente dores de cabeça frequentes?", opcoes: ["Sim", "Não"] },
  { id: 3, texto: "Está com dor no corpo?", opcoes: ["Sim", "Não"] },
  { id: 4, texto: "Perda de apetite?", opcoes: ["Sim", "Não"] },
  { id: 5, texto: "Você teve tosse recentemente?", opcoes: ["Sim", "Não"] },
  { id: 6, texto: "Está com cansaço incomum?", opcoes: ["Sim", "Não"] },
  { id: 7, texto: "Está com dor de garganta?", opcoes: ["Sim", "Não"] },
  { id: 8, texto: "Tem dificuldade para respirar?", opcoes: ["Sim", "Não"] },
  { id: 9, texto: "Está com náuseas ou vômitos?", opcoes: ["Sim", "Não"] },
  { id: 10, texto: "Sente calafrios frequentemente?", opcoes: ["Sim", "Não"] },
]

// Combinações para identificar sintomas
// Combinações para identificar sintomas
const identificarSintomas = (respostas) => {
  const sintomas = []
  let sintomaGrave = false // Variável para rastrear sintomas graves

  // Identificação de sintomas
  if (
    respostas[1] === "Sim" &&
    respostas[2] === "Sim" &&
    respostas[3] === "Sim" &&
    respostas[6] === "Sim"
  ) {
    sintomas.push("Possível Infecção Viral")
  }
  if (
    respostas[6] === "Sim" &&
    respostas[4] === "Sim" &&
    respostas[3] === "Sim" &&
    respostas[2] === "Sim"
  ) {
    sintomas.push("Possível Síndrome de Fadiga Crônica")
  }
  if (
    respostas[1] === "Sim" &&
    respostas[7] === "Sim" &&
    respostas[5] === "Sim" &&
    respostas[6] === "Não"
  ) {
    sintomas.push("Possível Resfriado Comum")
  }
  if (
    respostas[5] === "Sim" &&
    respostas[8] === "Sim" &&
    respostas[7] === "Sim" &&
    respostas[1] === "Sim"
  ) {
    sintomas.push("Possível Infecção Respiratória")
  }
  if (
    respostas[1] === "Sim" &&
    respostas[9] === "Sim" &&
    respostas[4] === "Sim" &&
    respostas[10] === "Sim"
  ) {
    sintomas.push("Possível Gastroenterite (Grave)")
    sintomaGrave = true
  }
  if (
    respostas[1] === "Sim" &&
    respostas[2] === "Sim" &&
    respostas[8] === "Sim" &&
    respostas[9] === "Sim"
  ) {
    sintomas.push("Possível Migração de Infecção (Grave)")
    sintomaGrave = true
  }
  if (
    respostas[6] === "Sim" &&
    respostas[9] === "Sim" &&
    respostas[4] === "Sim" &&
    respostas[10] === "Sim"
  ) {
    sintomas.push("Possível Desidratação (Grave)")
    sintomaGrave = true
  }

  return { sintomas, estadoGrave: sintomaGrave }
}

// Lista de hospitais com coordenadas
const listaHospitais = [
  [
    {
      nome: "Hospital São Lucas - Fernandes da Silveira",
      latitude: -10.91454,
      longitude: -37.06537,
      endereco:
        "R. Cel. Stanley da Silveira, 33 - São José, Aracaju - SE, 49015-400",
    },
    {
      nome: "Hospital Primavera",
      latitude: -10.95818,
      longitude: -37.05627,
      endereco:
        "Av. Ministro Geraldo Barreto Sobral, 2277 - Jardins, Aracaju - SE, 49026-010",
    },
    {
      nome: "Hospital Renascença",
      latitude: -10.93643,
      longitude: -37.06822,
      endereco:
        "Av. Gonçalo Rolemberg Leite, 1490 - Salgado Filho, Aracaju - SE, 49050-370",
    },
    {
      nome: "Hospital e Maternidade Santa Isabel",
      latitude: -10.92153,
      longitude: -37.06501,
      endereco:
        "Av. Simeão Sobral, 1312 - 18 do Forte, Aracaju - SE, 49072-720",
    },
    {
      nome: "Hospital Decós",
      latitude: -10.98513,
      longitude: -37.05267,
      endereco:
        "Av. Mario Jorge Menezes Viêira, 2477 - Coroa do Meio, Aracaju - SE, 49035-100",
    },
    {
      nome: "Hospital Nestor Piva",
      latitude: -10.91544,
      longitude: -37.06328,
      endereco: "Av. Maranhão, s/n - 18 do Forte, Aracaju - SE, 49072-000",
    },
    {
      nome: "Hospital do Rim de Sergipe",
      latitude: -10.90979,
      longitude: -37.06398,
      endereco: "R. Arauá, 02 - 41 - Centro, Aracaju - SE, 49010-330",
    },
    {
      nome: "Hospital Zona Sul",
      latitude: -10.96204,
      longitude: -37.07832,
      endereco:
        "Av. José Carlos Silva, 4215 - São Conrado, Aracaju - SE, 49042-190",
    },
    {
      nome: "Hospital Universitário",
      latitude: -10.93847,
      longitude: -37.07291,
      endereco: "R. Cláudio Batista - Palestina, Aracaju - SE, 49060-676",
    },
    {
      nome: "Hospital de Urgência de Sergipe",
      latitude: -10.93285,
      longitude: -37.07156,
      endereco:
        "Av. Pres. Tancredo Neves, 7501 - Capucho, Aracaju - SE, 49095-000",
    },
    {
      nome: "Hospital Gabriel Soares",
      latitude: -10.92037,
      longitude: -37.06585,
      endereco: "Rua Itabaiana, 690 - Centro, Aracaju - SE, 49015-110",
    },
    {
      nome: "Hospital Cirurgia",
      latitude: -10.91898,
      longitude: -37.06548,
      endereco: "Av. Des. Maynard, 174 - Cirurgia, Aracaju - SE, 49055-000",
    },
  ],
]

// Função para calcular distância entre coordenadas
function calcularDistancia(lat1, lng1, lat2, lng2) {
  const R = 6371 // Raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Componente DiagnosticoPrevio
export default function DiagnosticoPrevio() {
  const { user } = useContext(UserContext)
  const [etapa, setEtapa] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [diagnostico, setDiagnostico] = useState(null)
  const [hospitalMaisProximo, setHospitalMaisProximo] = useState(null)

  const handleResposta = (resposta) => {
    const novasRespostas = { ...respostas, [perguntas[etapa].id]: resposta }
    setRespostas(novasRespostas)

    if (etapa + 1 < perguntas.length) {
      setEtapa(etapa + 1)
    } else {
      const diagnostico = identificarSintomas(novasRespostas)
      setDiagnostico(diagnostico)

      if (diagnostico.estadoGrave) {
        obterCoordenadasDoUsuario()
      }
    }
  }

  const obterCoordenadasDoUsuario = async () => {
    try {
      const userId = user.id
      console.log("ID do usuário:", userId) // ID Logado

      // Requisição para obter o CEP do usuário
      const responseCep = await axios.get(
        `http://localhost:3006/usuario/cep/${userId}`
      )
      const cep = responseCep.data.cep

      // Requisição para obter a localização a partir do CEP usando ViaCEP
      const responseViaCep = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
      )
      const { logradouro, localidade, uf } = responseViaCep.data

      // Requisição para obter latitude e longitude usando OpenCage
      const apiKey = "fc83863ae3a144b68a8399d98b9fc665" // chave de API do OpenCage
      const query = `${logradouro}, ${localidade}, ${uf}`

      const geoData = await opencage.geocode({
        q: query,
        key: apiKey,
        language: "pt",
      })

      if (geoData.status.code === 200 && geoData.results.length > 0) {
        const { lat, lng } = geoData.results[0].geometry
        console.log(`Coordenadas: Latitude ${lat}, Longitude ${lng}`)

        // Utilize as coordenadas
        encontrarHospitalMaisProximo(lat, lng)
      } else {
        console.error("Nenhum resultado encontrado para a localização:", query)
      }
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error)
    }
  }

  const encontrarHospitalMaisProximo = (latPaciente, lngPaciente) => {
    let hospitalMaisProximo = null
    let menorDistancia = Infinity

    listaHospitais[0].forEach((hospital) => {
      const distancia = calcularDistancia(
        latPaciente,
        lngPaciente,
        hospital.latitude,
        hospital.longitude
      )
      if (distancia < menorDistancia) {
        menorDistancia = distancia
        hospitalMaisProximo = hospital
      }
    })

    setHospitalMaisProximo(hospitalMaisProximo)
  }

  const progresso = Math.round(((etapa + 1) / perguntas.length) * 100)

  return (
    <div className={styles.container}>
      <h1>Diagnóstico Prévio</h1>
      <p className={styles.welcomeMessage}>
        Olá, {user.nome}! <br />
        Estamos aqui para ajudá-lo a entender melhor seus sintomas.
      </p>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progress}
          style={{
            width: `${progresso}%`,
            backgroundColor: progresso === 100 ? "#28a745" : "#ffc107",
          }}
        />
      </div>
      <p className={styles.progressText}>Progresso: {progresso}%</p>

      {!diagnostico ? (
        <div className={styles.questionSection}>
          <h2>{perguntas[etapa].texto}</h2>
          <div className={styles.optionsContainer}>
            {perguntas[etapa].opcoes.map((opcao, index) => (
              <button
                key={index}
                onClick={() => handleResposta(opcao)}
                className={styles.optionButton}
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.diagnosis}>
          <h2>Diagnóstico Preliminar</h2>
          <ul>
            {diagnostico.sintomas.map((sintoma, index) => (
              <li key={index}>{sintoma}</li>
            ))}
          </ul>

          {diagnostico.estadoGrave && (
            <div className={styles.alertContainer}>
              <p className={styles.alert}>
                Atenção: Você possui um ou mais sintomas graves identificados.
                Recomendamos que você procure o hospital mais próximo
                imediatamente.
              </p>
            </div>
          )}

          {hospitalMaisProximo && (
            <div className={styles.hospitalInfo}>
              <h3>Hospital mais próximo:</h3>
              <p>{hospitalMaisProximo.nome}</p>
              <p>{hospitalMaisProximo.endereco}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
