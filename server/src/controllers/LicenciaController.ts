import { Request, Response } from "express";
import Licencia from "../models/Licencia";

export class LicenciaController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const licencias = await Licencia.find({});
      res.status(201).json({
        data: licencias,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar las licencias" });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { tipo, nivel } = req.body;

    try {
      const licenciaExistente = await Licencia.findOne({ where: { tipo } });

      if (licenciaExistente) {
        const error = new Error(`Esa Licencia ya está registrada`);
        return res.status(409).json({ error: error.message });
      }

      const licencia = new Licencia({ tipo, nivel });

      await licencia.save();

      res.status(201).json({ message: "Licencia creado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear la licencia" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    const { licenciaID } = req.params;
    try {
      const licencia = await Licencia.findById(licenciaID);

      if (!licencia) {
        const error = new Error(`Licencia con ID ${licencia} no encontrada`);
        return res.status(404).json({ error: error.message });
      }
      res.status(201).json({ data: licencia });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar licencia" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    const { licenciaID } = req.params;

    try {
      const licencia = await Licencia.findById(licenciaID);

      if (!licencia) {
        const error = new Error(`Licencia con ID ${licenciaID} no encontrada`);
        return res.status(404).json({ error: error.message });
      }

      await Licencia.findByIdAndUpdate(licenciaID, req.body, { new: true });

      res.status(200).json({ message: "Licencia actualizada correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar la licencia" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    const { licenciaID } = req.params;
    try {
      const licencia = await Licencia.findById(licenciaID);

      if (!licencia) {
        const error = new Error(`Licencia con ID ${licenciaID} no encontrada`);
        return res.status(404).json({ error: error.message });
      }

      licencia.activo = !licencia.activo;
      await licencia.save();

      res.status(201).json({ message: `Licencia ${licencia.tipo} ${licencia.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al cambiar de estado" });
    }
  };
}
