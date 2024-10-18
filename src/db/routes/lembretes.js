import express from 'express'
import { cadastrarLembrete, deletarLembrete } from '../controllers/lembretesController.js'

const router = express.Router()

router.post('/cadastrar', cadastrarLembrete)
router.delete('/:id', deletarLembrete)

export default router