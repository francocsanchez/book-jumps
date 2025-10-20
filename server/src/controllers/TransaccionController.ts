import { Request, Response } from "express";
import Transaccion from "../models/Transaccion";

export class TransaccionController {
  static generarIngreso = async (req: Request, res: Response) => {
    try {
      const transaccion = new Transaccion(req.body);
      transaccion.tipo = true; // Ingreso;
      transaccion.monto = req.body.monto * 1;
      await transaccion.save();

      res.status(201).json({ message: "Egreso registrado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al registrar movimiento" });
    }
  };

  static generarEgreso = async (req: Request, res: Response) => {
    try {
      const transaccion = new Transaccion(req.body);
      transaccion.tipo = false; // Egreso;
      transaccion.monto = req.body.monto * -1;
      await transaccion.save();

      res.status(201).json({ message: "Egreso registrado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al registrar movimiento" });
    }
  };

  static getMovimientos = async (req: Request, res: Response) => {
    try {
      const transacciones = await Transaccion.find()
        .populate({ path: "concepto", select: "nombre _id" }) // <<< singular
        .sort({ createdAt: -1 })
        .lean();
      res.status(200).json({ data: transacciones });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los movimientos" });
    }
  };
}
