import { Router } from "express";
import { validateCuota } from "../middleware/cuota";
import { CuotaController } from "../controllers/CuotaController";

const router = Router();
router.param("cuotaID", validateCuota);

//* ------------------- Rutas cuotas
router.get("/:estados", CuotaController.cuotasEstados);
router.post("/:anioMes/generar", CuotaController.generarCuotas);
router.get("/:anioMes/listar", CuotaController.listCuotasPorPeriodo);

router.patch("/:cuotaID/pagar", CuotaController.pagarCuota);
router.patch("/:cuotaID/eximir", CuotaController.eximirCuota);
router.patch("/:cuotaID/pendiente", CuotaController.cuotaPendiente);
router.get("/", CuotaController.listCuotas);

export default router;
