import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TransaccionController } from "../controllers/TransaccionController";

const router = Router();

//* ------------------- Rutas transaccion

router.get("/", TransaccionController.getMovimientos);

router.post(
  "/egreso",
  [
    body("monto").isNumeric().withMessage("El monto de transaccion debe ser un numero").trim(),
    body("descripcion").notEmpty().withMessage("La descripcion de transaccion es obligatoria").trim(),
    body("concepto").isMongoId().withMessage("El ID de concepto no es valido").trim(),
  ],
  handleInputErrors,
  TransaccionController.generarEgreso
);

router.post(
  "/ingreso",
  [
    body("monto").isNumeric().withMessage("El monto de transaccion debe ser un numero").trim(),
    body("descripcion").notEmpty().withMessage("La descripcion de transaccion es obligatoria").trim(),
    body("concepto").isMongoId().withMessage("El ID de concepto no es valido").trim(),
  ],
  handleInputErrors,
  TransaccionController.generarIngreso
);
export default router;
