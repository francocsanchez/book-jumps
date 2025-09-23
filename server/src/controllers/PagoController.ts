import { Request, Response } from "express";
import Pago from "../models/Pago";

export class PagoController {
  //* ------------------- Rutas cuotas extras
  static listPagos = async (req: Request, res: Response) => {
    try {
      const pagos = await Pago.find()
        .select("_id periodo importe notas fechaPago")
        .populate({ path: "usuario", select: "nombre apellido" })
        .sort({ fechaPago: -1 })
        .lean();

      // Agrupar importes por periodo
      const mapa = new Map<string, number>();
      pagos.forEach((pago) => {
        const periodo = pago.periodo;
        const importe = pago.importe ?? 0;
        mapa.set(periodo, (mapa.get(periodo) ?? 0) + importe);
      });

      const dataGrafico = Array.from(mapa, ([periodo, total]) => ({
        periodo,
        total,
      })).sort((a, b) => a.periodo.localeCompare(b.periodo));

      res.status(200).json({
        pagos,
        dataGrafico,
      });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los pagos" });
    }
  };
}
