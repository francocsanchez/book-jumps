import type { Request, Response, NextFunction } from "express";
import Usuario, { IUsuario } from "../models/Usuario";

declare global {
  namespace Express {
    interface Request {
      usuario?: IUsuario;
    }
  }
}

export async function validateUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const { usuarioID } = req.params;

    const usuario = await Usuario.findById(usuarioID);

    if (!usuario) {
      const error = new Error(`Usuario no ID ${usuarioID} no encontrado`);
      return res.status(404).json({ error: error.message });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
