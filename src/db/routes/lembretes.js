import express from "express"
import {
  atualizarStatusLembretes,
  cadastrarLembrete,
  deletarLembrete,
  obterLembretePorUsuario,
} from "../controllers/lembretesController.js"

const router = express.Router()

router.post("/cadastrar", cadastrarLembrete)
router.delete("/:id", deletarLembrete)
router.get("/:usuario_id", obterLembretePorUsuario)
router.post("/atualizarStatus", atualizarStatusLembretes)

export default router
