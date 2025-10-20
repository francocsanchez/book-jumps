import { Request, Response } from "express";
import Aeronave from "../models/Aeronave";

export class AeronaveController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const aeronaves = await Aeronave.find({});
      res.status(200).json({
        data: aeronaves,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar las aeronaves" });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { matricula, modeloID, anoFabricacion, clubID } = req.body;

    try {
      const aeronaveExistente = await Aeronave.findOne({ where: { matricula } });

      if (aeronaveExistente) {
        const error = new Error(`Esa aeronave ya está registrada`);
        return res.status(409).json({ error: error.message });
      }

      const aeronave = new Aeronave({ matricula, modeloID, anoFabricacion });

      await aeronave.save();

      res.status(200).json({ message: "Aeronave creada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el club" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ data: req.aeronave });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar aeronave" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      await Aeronave.findByIdAndUpdate(req.aeronave._id, req.body, { new: true });

      res.status(200).json({ message: "Aeronave actualizada correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar la Aeronave" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    try {
      req.aeronave.activo = !req.aeronave.activo;
      await req.aeronave.save();

      res.status(200).json({ message: `Aeronave ${req.aeronave.matricula} ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
