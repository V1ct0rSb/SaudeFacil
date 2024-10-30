import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import { UserProvider } from "./db/context/UserContext"
import CadastroPaciente from "./pages/CadastroPaciente/CadastroPaciente"
import Home from "./pages/Home/Home.jsx"
import Login from "./pages/LoginPaciente/Login.jsx"
import CadastroSintomasPaciente from "./pages/Paciente/CadastroSintomasPaciente/CadastroSintomasPaciente.jsx"
import DiagnosticoPrevio from "./pages/Paciente/DiagnosticoPrevio/DiagnosticoPrevio.jsx"
import HomePaciente from "./pages/Paciente/HomePaciente/HomePaciente.jsx"
import InfoPaciente from "./pages/Paciente/InfoPaciente/InfoPaciente.jsx"
import "./styles/Global.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/CadastroPaciente",
        element: <CadastroPaciente />,
      },
      {
        path: "/LoginPaciente",
        element: <Login />,
      },
      {
        path: "/HomePaciente",
        element: <HomePaciente />,
      },
      {
        path: "/CadastroSintomasPaciente",
        element: <CadastroSintomasPaciente />,
      },
      {
        path: "/DiagnosticoPrevio",
        element: <DiagnosticoPrevio />,
      },
      {
        path: "/InfoPaciente",
        element: <InfoPaciente />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
)
