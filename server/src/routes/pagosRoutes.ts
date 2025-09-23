import { Router } from "express";
import { PagoController } from "../controllers/PagoController";

const router = Router();

//* ------------------- Rutas pagos
router.get("/", PagoController.listPagos);

export default router;
