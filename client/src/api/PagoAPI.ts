import api from "@/libs/axios";
import { PagoListResponse, type PagoGenerateFormData } from "@/types/TPago";
import { isAxiosError } from "axios";

export async function generatePago(formData: PagoGenerateFormData) {
  try {
    const { data } = await api.patch(`/cuotas/${formData.cuota}/pagar`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error registrar pago");
    }
    throw error;
  }
}

export async function listPagos() {
  try {
    const { data } = await api(`/pagos/`);
    const response = PagoListResponse.safeParse(data);

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
