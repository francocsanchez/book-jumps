import api from "@/libs/axios";
import { listUsuarioView, UsuarioSchema, UsuarioView, type Usuario, type UsuarioFormData } from "@/types/TUsuario";
import { isAxiosError } from "axios";

export async function getSocios() {
  try {
    const { data } = await api("/usuarios");
    const response = listUsuarioView.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error fetching socios");
    }
    throw error;
  }
}

export async function changeStatusSocio(id: Usuario["_id"]) {
  try {
    const { data } = await api.delete(`/usuarios/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error delete socio");
    }
    throw error;
  }
}

export async function createUsuario(formData: UsuarioFormData) {
  try {
    const { data } = await api.post(`/usuarios`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);
      throw new Error(error.response.data.error || "Error create usuario");
    }
    throw error;
  }
}

export async function getUsuarioByID(id: Usuario["_id"]) {
  try {
    const { data } = await api(`/usuarios/${id}`);
    const response = UsuarioSchema.safeParse(data.data);

    if (!response.success) {
      throw new Error("Error en validación de usuarios");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error get usuario");
    }
    throw error;
  }
}

export async function getUsuarioByIDWithCuotas(id: Usuario["_id"]) {
  try {
    const { data } = await api(`/usuarios/${id}/view`);
    const response = UsuarioView.safeParse(data);
    console.log(response);

    if (!response.success) {
      throw new Error("Error en validación de usuarios");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error get usuario");
    }
    throw error;
  }
}

type updateUsuarioByIDParams = {
  formData: UsuarioFormData;
  usuarioID: Usuario["_id"];
};
export async function updateUsuarioByID({ formData, usuarioID }: updateUsuarioByIDParams) {
  try {
    const { data } = await api.put(`/usuarios/${usuarioID}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error update usuario");
    }
    throw error;
  }
}
