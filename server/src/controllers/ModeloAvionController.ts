import { Request, Response } from "express";
import ModeloAvion from "../models/ModeloAvion";

export class ModeloAvionController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const modelos_aviones = await ModeloAvion.find({});
      res.status(201).json({
        data: modelos_aviones,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los modelos de aviones" });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { nombre } = req.body;

    try {
      const modelo_avion = new ModeloAvion({ nombre, marca: req.marca_avion._id });
      await modelo_avion.save();

      res.status(201).json({ message: "Modelo de Avion creada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear la marca de avion" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    try {
      res.status(201).json({ data: req.modelo_avion });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar Modelo de Avion" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      await ModeloAvion.findByIdAndUpdate(req.modelo_avion._id, req.body, { new: true });

      res.status(200).json({ message: "Modelo de Avion actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el Modelo de Avion" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    try {
      req.modelo_avion.activo = !req.modelo_avion.activo;
      await req.modelo_avion.save();

      res
        .status(201)
        .json({ message: `Modelo de Avion ${req.modelo_avion.nombre} ${req.modelo_avion.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
