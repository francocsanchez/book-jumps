import type { Request, Response, NextFunction } from "express";
import Club, { IClub } from "../models/Club";

declare global {
  namespace Express {
    interface Request {
      club?: IClub;
    }
  }
}

export async function validateClub(req: Request, res: Response, next: NextFunction) {
  try {
    const { clubID } = req.params;

    const club = await Club.findById(clubID);

    if (!club) {
      const error = new Error(`Club con ID ${clubID} no encontrado`);
      return res.status(404).json({ error: error.message });
    }

    req.club = club;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
}
