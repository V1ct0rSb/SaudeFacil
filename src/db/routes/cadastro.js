import express from "express"
import { cadastrarUsuario } from "../controllers/cadastroController.js"

const router = express.Router()

router.post("/cadastro", cadastrarUsuario)

export default router
