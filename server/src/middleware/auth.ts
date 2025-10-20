import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario, { IUsuario } from "../models/Usuario";

declare global {
  namespace Express {
    interface Request {
      usuario?: IUsuario;
    }
  }
}
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "No posee permisos" });
    return;
  }

  const [, token] = bearer.split(" ");

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);

    if (typeof decode === "object" && decode.id) {
      const user = await Usuario.findById(decode.id).select("-password");
      if (!user) {
        res.status(401).json({ message: "Token no valido" });
      }
      req.usuario = user;
    }
  } catch (error) {
    res.status(401).json({ message: "Token no valido" });
  }
  next();
}
