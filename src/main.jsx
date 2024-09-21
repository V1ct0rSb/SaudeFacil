import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import CadastroPaciente from "./pages/CadastroPaciente/CadastroPaciente"
import Home from "./pages/Home/Home.jsx"
import Login from "./pages/LoginPaciente/Login.jsx"
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
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
