import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import Cuota from "../models/Cuota";
import Club from "../models/Club";
import Pago from "../models/Pago";

//* ------------------- Helpers
const PERIODO_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/; // "YYYY-MM"

export class CuotaController {
  //* ------------------- Rutas usuarios extras
  static cuotasEstados = async (req: Request, res: Response) => {
    const { estados } = req.params;

    try {
      const cuotas = await Cuota.find({ estado: estados });

      res.status(200).json({
        data: cuotas,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los usuarios activos" });
    }
  };

  static generarCuotas = async (req: Request, res: Response) => {
    const { anioMes } = req.params;
    try {
      if (!PERIODO_REGEX.test(anioMes)) {
        const error = new Error(`Formato inválido. Usa "YYYY-MM", ej: 2025-09'`);
        return res.status(400).json({ error: error.message });
      }

      const club = await Club.findOne({ activo: true }).select("valores.cuota").lean();
      if (!club) {
        const error = new Error(`No hay club activo configurado.`);
        return res.status(400).json({ error: error.message });
      }

      const importe = Number(club.valores.cuota);

      const usuarios = await Usuario.find({
        activo: true,
        tiposUsuario: "paracaidista",
      })
        .select("_id")
        .lean();

      if (!usuarios.length) {
        return res.status(200).json({
          message: `No hay usuarios paracaidistas activos para ${anioMes}.`,
        });
      }

      const ops = usuarios.map((u) => ({
        updateOne: {
          filter: { usuario: u._id, periodo: anioMes },
          update: {
            $setOnInsert: {
              usuario: u._id,
              periodo: anioMes,
              importe,
              estado: "pendiente",
            },
          },
          upsert: true,
        },
      }));

      await Cuota.bulkWrite(ops, { ordered: false });

      res.status(200).json({
        message: `Cuotas del perido ${anioMes} generadas exitosamente`,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los usuarios activos" });
    }
  };

  static pagarCuota = async (req: Request, res: Response) => {
    const { fechaPago, notas } = req.body;

    try {
      if (req.cuota.estado === "pagada") {
        return res.status(200).json({ message: `La cuota ${req.cuota.periodo} ya estaba pagada` });
      }

      req.cuota.estado = "pagada";

      const dataPago = {
        cuota: req.cuota._id,
        usuario: req.cuota.usuario,
        periodo: req.cuota.periodo,
        importe: req.cuota.importe,
        fechaPago,
        notas,
      };

      const newPago = new Pago(dataPago);

      await newPago.save();
      await req.cuota.save();

      return res.status(200).json({ message: `Cuota del ${req.cuota.periodo} abonada exitosamente` });
    } catch (error: any) {
      console.error(error?.message || error);
      return res.status(500).json({ message: "Error al actualizar la cuota" });
    }
  };

  static eximirCuota = async (req: Request, res: Response) => {
    const { fechaPago, notas } = req.body;

    try {
      if (req.cuota.estado === "exenta") {
        return res.status(200).json({ message: `La cuota ${req.cuota.periodo} ya estaba exenta` });
      }

      req.cuota.estado = "exenta";

      const dataPago = {
        cuota: req.cuota._id,
        usuario: req.cuota.usuario,
        periodo: req.cuota.periodo,
        importe: req.cuota.importe,
        fechaPago,
        notas,
      };

      const newPago = new Pago(dataPago);

      await newPago.save();
      await req.cuota.save();

      return res.status(200).json({ message: `Cuota del ${req.cuota.periodo} exenta exitosamente` });
    } catch (error: any) {
      console.error(error?.message || error);
      return res.status(500).json({ message: "Error al actualizar la cuota" });
    }
  };

  static cuotaPendiente = async (req: Request, res: Response) => {
    try {
      if (req.cuota.estado === "pendiente") {
        return res.status(200).json({ message: `La cuota ${req.cuota.periodo} ya estaba pendiente` });
      }

      req.cuota.estado = "pendiente";

      await Pago.deleteOne({ cuota: req.cuota._id });
      await req.cuota.save();

      return res.status(200).json({ message: `Cuota del ${req.cuota.periodo} paso a pendiente exitosamente` });
    } catch (error: any) {
      console.error(error?.message || error);
      return res.status(500).json({ message: "Error al actualizar la cuota" });
    }
  };
}
