import api from "@/libs/axios";
import { LicenciaSchemaFormData, listLicenciasSchema, type Licencia, type LicenciaFormData } from "@/types";
import { isAxiosError } from "axios";

export async function createLicencia(formData: LicenciaFormData) {
  try {
    const { data } = await api.post("/licencias", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error create licencias");
    }
    throw error;
  }
}

export async function getLicencias() {
  try {
    const { data } = await api("/licencias");
    const response = listLicenciasSchema.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error fetching licencias");
    }
    throw error;
  }
}

export async function getLicenciaByID(licenciaID: Licencia["_id"]) {
  try {
    const { data } = await api(`/licencias/${licenciaID}`);
    const response = LicenciaSchemaFormData.safeParse(data.data);

    if (!response.success) {
      throw new Error("Error en validación de licencia");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error get licencia");
    }
    throw error;
  }
}

type UpdateLicenciaParams = {
  formData: LicenciaFormData;
  licenciaID: Licencia["_id"];
};
export async function updateLicenciaByID({ formData, licenciaID }: UpdateLicenciaParams) {
  try {
    const { data } = await api.put(`/licencias/${licenciaID}`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error update licencia");
    }
    throw error;
  }
}

export async function changeStatusLicencia(id: Licencia["_id"]) {
  try {
    const { data } = await api.delete(`/licencias/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error delete licencia");
    }
    throw error;
  }
}
