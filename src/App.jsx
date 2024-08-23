import "./styles/Global.css"

// Reaproveitamento de estrutura
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
