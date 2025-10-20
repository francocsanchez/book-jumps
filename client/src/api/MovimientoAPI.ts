import api from "@/libs/axios";
import { MovimientosArray, type MovimientoFormData } from "@/types/TMovimiento";
import { isAxiosError } from "axios";

export async function generarMovimientoEgreso(formData: MovimientoFormData) {
  try {
    const { data } = await api.post(`/transacciones/egreso`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error listar cuotas");
    }
    throw error;
  }
}

export async function generarMovimientoIngreso(formData: MovimientoFormData) {
  try {
    const { data } = await api.post(`/transacciones/ingreso`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error listar cuotas");
    }
    throw error;
  }
}

export async function listMovimientos() {
  try {
    const { data } = await api.get(`/transacciones`);
    const response = MovimientosArray.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
    throw new Error("Respuesta inválida del servidor");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error listar pago");
    }
    throw error;
  }
}
