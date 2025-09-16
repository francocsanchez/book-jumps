import api from "@/libs/axios";
import type { Club } from "@/types";
import { ClubSchema } from "@/types/TClub";
import { isAxiosError } from "axios";

export async function getInfoClub() {
  try {
    const { data } = await api(`/clubs/`);

    const response = ClubSchema.safeParse(data.data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error fetching licencias");
    }
    throw error;
  }
}

export async function updateInfoClub(formData: Club) {
  try {
    const { data } = await api.put(`/clubs`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error update club");
    }
    throw error;
  }
}
