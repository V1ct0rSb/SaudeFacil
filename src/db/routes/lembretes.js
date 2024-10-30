import express from 'express'
import {
  cadastrarLembrete,
  deletarLembrete,
  obterLembretePorUsuario,
} from "../controllers/lembretesController.js"

const router = express.Router()

router.post('/cadastrar', cadastrarLembrete)
router.delete('/:id', deletarLembrete)
router.get("/:usuario_id", obterLembretePorUsuario)

export default router