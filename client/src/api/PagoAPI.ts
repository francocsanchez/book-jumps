import api from "@/libs/axios";
import type { PagoGenerateFormData } from "@/types/TPago";
import { isAxiosError } from "axios";

export async function generatePago(formData: PagoGenerateFormData) {
  try {
    const { data } = await api.patch(`/cuotas/${formData.cuota}/pagar`, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error registrar pago");
    }
    throw error;
  }
}
