import api from "@/libs/axios";
import { listConceptos } from "@/types/TConceptos";
import { isAxiosError } from "axios";

export async function listConceptosEgresos() {
  try {
    const { data } = await api(`/conceptos/egresos`);
    const response = listConceptos.safeParse(data.data);

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
export async function listConceptosIngresos() {
  try {
    const { data } = await api(`/conceptos/ingresos`);
    const response = listConceptos.safeParse(data.data);

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
