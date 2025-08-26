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
    const { nombre } = req.body;

    try {
      const marcaAvionExistente = await MarcaAvion.findOne({ where: { nombre } });

      if (marcaAvionExistente) {
        const error = new Error(`Esa Marca de Avion ya está registrada`);
        return res.status(409).json({ error: error.message });
      }

      const marca_avion = new MarcaAvion({ nombre });

      await marca_avion.save();

      res.status(201).json({ message: "Marca de Avion creada exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear la marca de avion" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    const { marcaAvionID } = req.params;
    try {
      const marca_avion = await MarcaAvion.findById(marcaAvionID);

      if (!marca_avion) {
        const error = new Error(`Marca de Avion con ID ${marca_avion} no encontrada`);
        return res.status(404).json({ error: error.message });
      }
      res.status(201).json({ data: marca_avion });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar marcas de aviones" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    const { marcaAvionID } = req.params;

    try {
      const marca_avion = await MarcaAvion.findById(marcaAvionID);

      if (!marca_avion) {
        const error = new Error(`Marca de Avion con ID ${marcaAvionID} no encontrada`);
        return res.status(404).json({ error: error.message });
      }

      await MarcaAvion.findByIdAndUpdate(marcaAvionID, req.body, { new: true });

      res.status(200).json({ message: "Marca de Avion actualizada correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar la Marca de Avion" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    const { marcaAvionID } = req.params;
    try {
      const marca_avion = await MarcaAvion.findById(marcaAvionID);

      if (!marca_avion) {
        const error = new Error(`Marca de Avion con ID ${marcaAvionID} no encontrada`);
        return res.status(404).json({ error: error.message });
      }

      marca_avion.activo = !marca_avion.activo;
      await marca_avion.save();

      res.status(201).json({ message: `Marca de Avion ${marca_avion.nombre} ${marca_avion.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
