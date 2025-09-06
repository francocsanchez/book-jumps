import api from "@/libs/axios";
import { listMarcaAvionesSchema, type AeronaveFormData, type MarcaAvion } from "@/types";
import { isAxiosError } from "axios";

// ------------------- API Marcas-Aviones

export async function getMarcaAviones() {
  try {
    const { data } = await api("/marcas-aviones");
    const response = listMarcaAvionesSchema.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error fetching aeronaves");
    }
    throw error;
  }
}

// ------------------- API Aeronaves

export async function createAeronave(formData: AeronaveFormData) {
  try {
    const { data } = await api.post(`/marcas-aviones/${formData.marca}/modelos`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error create marca de aviones");
    }
    throw error;
  }
}

export async function getAeronaves(marcaAvionID: MarcaAvion["_id"]) {
  try {
    const { data } = await api(`/marcas-aviones/${marcaAvionID}/modelos`);
    const response = listMarcaAvionesSchema.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error fetching aeronaves");
    }
    throw error;
  }
}
