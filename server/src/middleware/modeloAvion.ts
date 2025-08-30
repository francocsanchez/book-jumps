import type { Request, Response, NextFunction } from "express";
import ModeloAvion, { IModeloAvion } from "../models/ModeloAvion";

declare global {
  namespace Express {
    interface Request {
      modelo_avion?: IModeloAvion;
    }
  }
}

export async function validateModeloAvion(req: Request, res: Response, next: NextFunction) {
  try {
    const { modeloAvionID } = req.params;

    const modelo_avion = await ModeloAvion.findById(modeloAvionID);

    if (!modelo_avion) {
      const error = new Error(`Modelo de Avion con ID ${modeloAvionID} no encontrado`);
      return res.status(404).json({ error: error.message });
    }

    req.modelo_avion = modelo_avion;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
