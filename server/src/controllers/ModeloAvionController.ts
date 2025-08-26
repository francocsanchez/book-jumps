import { Request, Response } from "express";
import MarcaAvion from "../models/MarcaAvion";
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
    const { marcaAvionID } = req.params;

    try {
      const marcaAvionExistente = await MarcaAvion.findById(marcaAvionID);

      if (!marcaAvionExistente) {
        const error = new Error(`Esa Marca de Avion no está registrada`);
        return res.status(409).json({ error: error.message });
      }

      const modelo_avion = new ModeloAvion({ nombre, marca: marcaAvionID });

      await modelo_avion.save();

      res.status(201).json({ message: "Modelo de Avion creada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear la marca de avion" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    const { modeloAvionID } = req.params;
    try {
      const modelo_avion = await ModeloAvion.findById(modeloAvionID);

      if (!modelo_avion) {
        const error = new Error(`Modelo de Avion con ID ${modelo_avion} no encontrada`);
        return res.status(404).json({ error: error.message });
      }
      res.status(201).json({ data: modelo_avion });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar Modelo de Avion" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    const { modeloAvionID } = req.params;

    try {
      const modelo_avion = await ModeloAvion.findById(modeloAvionID);

      if (!modelo_avion) {
        const error = new Error(`Modelo de Avion con ID ${modeloAvionID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }

      await ModeloAvion.findByIdAndUpdate(modeloAvionID, req.body, { new: true });

      res.status(200).json({ message: "Modelo de Avion actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el Modelo de Avion" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    const { modeloAvionID } = req.params;
    try {
      const modelo_avion = await ModeloAvion.findById(modeloAvionID);

      if (!modelo_avion) {
        const error = new Error(`Modelo de Avion con ID ${modeloAvionID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }

      modelo_avion.activo = !modelo_avion.activo;
      await modelo_avion.save();

      res
        .status(201)
        .json({ message: `Modelo de Avion ${modelo_avion.nombre} ${modelo_avion.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
