import { Request, Response } from "express";
import Concepto from "../models/Concepto";

export class ConceptoController {
  static create = async (req: Request, res: Response) => {
    const { nombre, tipo } = req.body;

    try {
      const conceptoExistente = await Concepto.findOne({ nombre, tipo });

      if (conceptoExistente) {
        const error = new Error(`Ese concepto ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      const concepto = new Concepto(req.body);
      await concepto.save();

      res.status(201).json({ message: "Concepto creado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el concepto" });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const conceptos = await Concepto.find();

      res.status(200).json({ data: conceptos });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar conceptos" });
    }
  };

  static getConcepto = async (req: Request, res: Response) => {
    try {
      const concepto = await Concepto.findById(req.concepto._id);

      if (!concepto) {
        const error = new Error(`Ese concepto no está registrado`);
        return res.status(409).json({ error: error.message });
      }

      res.status(200).json({ data: concepto });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar concepto" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      const concepto = await Concepto.findById(req.concepto._id);
      await Concepto.findByIdAndUpdate(concepto._id, req.body, { new: true });

      res.status(200).json({ message: "Concepto actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el concepto" });
    }
  };

  static changeStatus = async (req: Request, res: Response) => {
    try {
      const concepto = await Concepto.findById(req.concepto._id);

      concepto.activo = !concepto.activo;
      await concepto.save();

      res.status(201).json({ message: `Concepto ${concepto.nombre} ${concepto.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el concepto" });
    }
  };

  static getIngresos = async (req: Request, res: Response) => {
    try {
      const conceptos = await Concepto.find({ activo: true, tipo: true }).sort({ nombre: 1 });
      res.status(200).json({ data: conceptos });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al obtener el concepto" });
    }
  };

  static getEgresos = async (req: Request, res: Response) => {
    try {
      const conceptos = await Concepto.find({ activo: true, tipo: false }).sort({ nombre: 1 });
      res.status(200).json({ data: conceptos });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el concepto" });
    }
  };
}
