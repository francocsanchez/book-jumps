import type { Request, Response, NextFunction } from "express";
import MarcaAvion, { IMarcaAvion } from "../models/MarcaAvion";

declare global {
  namespace Express {
    interface Request {
      marca_avion?: IMarcaAvion;
    }
  }
}

export async function validateMarcaAvion(req: Request, res: Response, next: NextFunction) {
  try {
    const { marcaAvionID } = req.params;

    const marca_avion = await MarcaAvion.findById(marcaAvionID);

    if (!marca_avion) {
      const error = new Error(`Marca de Avion con ID ${marca_avion} no encontrada`);
      return res.status(404).json({ error: error.message });
    }

    req.marca_avion = marca_avion;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
