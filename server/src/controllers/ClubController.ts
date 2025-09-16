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
    const { cuit } = req.body;

    try {
      const clubExistente = await Club.findOne({ cuit });

      if (clubExistente) {
        const error = new Error(`Ese club ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      const club = new Club(req.body);
      await club.save();

      res.status(201).json({ message: "Club creado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el club" });
    }
  };

  static getClub = async (req: Request, res: Response) => {
    try {
      const club = await Club.findOne();

      res.status(200).json({ data: club });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar club" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      const club = await Club.findOne();
      await Club.findByIdAndUpdate(club._id, req.body, { new: true });

      res.status(200).json({ message: "Club actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el club" });
    }
  };
}
