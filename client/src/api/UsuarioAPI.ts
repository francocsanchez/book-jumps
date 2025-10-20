import api from "@/libs/axios";
import type { Usuario, UsuarioChangePassword, UsuarioLoginForm } from "@/types/TUsuario";
import { isAxiosError } from "axios";

export async function authenticaUser(formData: UsuarioLoginForm) {
  try {
    const { data } = await api.post(`/usuarios/login`, formData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

export async function getUsuario() {
  try {
    const { data } = await api(`/usuarios/username`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}

type changePasswordPropos = {
  formData: UsuarioChangePassword;
  usuarioID: Usuario["_id"];
};

export async function changePassword({ formData, usuarioID }: changePasswordPropos) {
  try {
    const { data } = await api(`/usuarios/${usuarioID}/change-password`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
  }
}
