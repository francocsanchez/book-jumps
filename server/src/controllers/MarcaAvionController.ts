import { Request, Response } from "express";
import MarcaAvion from "../models/MarcaAvion";

export class MarcaAvionController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const marcas_aviones = await MarcaAvion.find({});
      res.status(201).json({
        data: marcas_aviones,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar las marcas de aviones" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const { nombre } = req.body;
      const marca_avion = new MarcaAvion({ nombre });

      await marca_avion.save();

      res.status(201).json({ message: "Marca de Avion creada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear la marca de avion" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    try {
      res.status(201).json({ data: req.marca_avion });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar marcas de aviones" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      await MarcaAvion.findByIdAndUpdate(req.marca_avion._id, req.body, { new: true });

      res.status(200).json({ message: "Marca de Avion actualizada correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar la Marca de Avion" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    try {
      req.marca_avion.activo = !req.marca_avion.activo;
      await req.marca_avion.save();

      res
        .status(201)
        .json({ message: `Marca de Avion ${req.marca_avion.nombre} ${req.marca_avion.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
