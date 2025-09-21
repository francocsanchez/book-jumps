import api from "@/libs/axios";
import { listCuotasConUsuarioView, listCuotasView, type Cuota, type CuotaGenerateFormDataType } from "@/types/TCuotas";
import { isAxiosError } from "axios";

export async function listCuotas() {
  try {
    const { data } = await api("/cuotas");
    const response = listCuotasView.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error listar cuotas");
    }
    throw error;
  }
}

export async function listCuotasPorPeriodo(periodo: Cuota["periodo"]) {
  try {
    const { data } = await api(`/cuotas/${periodo}/listar`);
    const response = listCuotasConUsuarioView.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error listar cuotas");
    }
    throw error;
  }
}

export async function generateCuotas(formData: CuotaGenerateFormDataType) {
  try {
    const { data } = await api.post(`/cuotas/generar`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error listar cuotas");
    }
    throw error;
  }
}
