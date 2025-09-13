import type { Request, Response, NextFunction } from "express";
import Cuota, { ICuota } from "../models/Cuota";

declare global {
  namespace Express {
    interface Request {
      cuota?: ICuota;
    }
  }
}

export async function validateCuota(req: Request, res: Response, next: NextFunction) {
  try {
    const { cuotaID } = req.params;

    const cuota = await Cuota.findById(cuotaID);

    if (!cuota) {
      const error = new Error(`Cuota con ID ${cuotaID} no encontrada`);
      return res.status(404).json({ error: error.message });
    }

    req.cuota = cuota;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
