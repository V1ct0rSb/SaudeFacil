import express from "express"
import {
  atualizarPaciente,
  obterPaciente,
} from "../controllers/cadastroController.js"
import { obterCepDoUsuario } from "../controllers/sintomasController.js"

const router = express.Router()

// Rota para obter o CEP do usuário
router.get("/cep/:usuario_id", obterCepDoUsuario)

// Rota para obter informações do paciente
router.get("/pacientes/:id", obterPaciente) 
// Rota para atualizar informações do paciente
router.put("/pacientes/:id", atualizarPaciente)

export default router
