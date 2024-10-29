import express from "express"
import {
  cadastrarSintoma,
  deletarSintoma,
  obterCepDoUsuario,
  obterSintomasPorUsuario,
} from "../controllers/sintomasController.js"

const router = express.Router()

router.get("/usuario/cep/:usuario_id", obterCepDoUsuario)
router.post("/cadastrar", cadastrarSintoma)
router.delete("/:id", deletarSintoma)
router.get("/:usuario_id", obterSintomasPorUsuario)

export default router
