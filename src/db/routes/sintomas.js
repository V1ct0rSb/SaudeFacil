import express from "express"
import {
  cadastrarSintoma,
  deletarSintoma,
  obterSintomasPorUsuario,
} from "../controllers/sintomasController.js"

const router = express.Router()

router.post("/cadastrar", cadastrarSintoma)
router.delete("/:id", deletarSintoma)
router.get("/:usuario_id", obterSintomasPorUsuario)

export default router
