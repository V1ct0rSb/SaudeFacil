import { useContext } from "react"
import { UserContext } from "../../../db/context/UserContext"

function HomePaciente() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Bem-vindo, {user ? user.nome : "sem nome"}!</h1>
    </div>
  )
}

export default HomePaciente
