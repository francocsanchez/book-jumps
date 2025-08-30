import type { Request, Response, NextFunction } from "express";
import Aeronave, { IAeronave } from "../models/Aeronave";

declare global {
  namespace Express {
    interface Request {
      aeronave?: IAeronave;
    }
  }
}

export async function validateAeronave(req: Request, res: Response, next: NextFunction) {
  try {
    const { aeronaveID } = req.params;

    const aeronave = await Aeronave.findById(aeronaveID);

    if (!aeronave) {
      const error = new Error(`Aeronave con ID ${aeronaveID} no encontrada`);
      return res.status(404).json({ error: error.message });
    }

    req.aeronave = aeronave;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
