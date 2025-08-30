import { Request, Response } from "express";
import Club from "../models/Club";
import { Types } from "mongoose";

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
    try {
      res.status(201).json({ data: req.club });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar club" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      await Club.findByIdAndUpdate(req.club._id, req.body, { new: true });

      res.status(200).json({ message: "Club actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el club" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    try {
      req.club.activo = !req.club.activo;
      await req.club.save();

      res.status(201).json({ message: `Club ${req.club.nombre} ${req.club.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };

  static addAeronaveToClub = async (req: Request, res: Response) => {
    try {
      await Club.findByIdAndUpdate(req.club._id, { $addToSet: { aeronaves: req.aeronave._id } }, { new: true });

      res.status(201).json({ message: "Aeronave agregada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al agregar una aeronave al club" });
    }
  };

  static removeAeronaveToClub = async (req: Request, res: Response) => {
    try {
      await Club.findByIdAndUpdate(req.club._id, { $pull: { aeronaves: req.aeronave._id } }, { new: true });

      res.status(201).json({ message: "Aeronave eliminada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al eliminar una aeronave al club" });
    }
  };
}
