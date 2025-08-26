import { Request, Response } from "express";
import Club from "../models/Club";

export class ClubController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const clubs = await Club.find({});
      res.status(201).json({
        data: clubs,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los club" });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { nombre, direccion, imagen } = req.body;

    try {
      const clubExistente = await Club.findOne({ where: { nombre } });

      if (clubExistente) {
        const error = new Error(`Ese club ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      const club = new Club({ nombre, direccion, imagen });

      await club.save();

      res.status(201).json({ message: "Club creado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el club" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    const { clubID } = req.params;
    try {
      const club = await Club.findById(clubID);

      if (!club) {
        const error = new Error(`Club con ID ${clubID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }
      res.status(201).json({ data: club });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar club" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    const { clubID } = req.params;

    try {
      const club = await Club.findById(clubID);

      if (!club) {
        const error = new Error(`Club con ID ${clubID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }

      await Club.findByIdAndUpdate(clubID, req.body, { new: true });

      res.status(200).json({ message: "Club actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el club" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    const { clubID } = req.params;
    try {
      const club = await Club.findById(clubID);

      if (!club) {
        const error = new Error(`Club con ID ${clubID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }

      club.activo = !club.activo;
      await club.save();

      res.status(201).json({ message: `Club ${club.nombre} ${club.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
