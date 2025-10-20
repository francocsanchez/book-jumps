import type { Request, Response, NextFunction } from "express";
import Concepto, { IConcepto } from "../models/Concepto";

declare global {
  namespace Express {
    interface Request {
      concepto?: IConcepto;
    }
  }
}

export async function validateConcepto(req: Request, res: Response, next: NextFunction) {
  try {
    const { conceptoID } = req.params;

    const concepto = await Concepto.findById(conceptoID);

    if (!concepto) {
      const error = new Error(`Concepto con ID ${conceptoID} no encontrada`);
      return res.status(404).json({ error: error.message });
    }

    req.concepto = concepto;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
