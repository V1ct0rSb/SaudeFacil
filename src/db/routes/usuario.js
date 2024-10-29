// usuarioRoutes.js
import express from "express"
import { obterCepDoUsuario } from "../controllers/sintomasController.js"

const router = express.Router()

// Rota para obter o CEP do usuário
router.get("/cep/:usuario_id", obterCepDoUsuario)

export default router
