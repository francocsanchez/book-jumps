import api from "@/libs/axios";
import { ClubSchema, type Club, type ClubFormData } from "@/types";
import { isAxiosError } from "axios";

export async function getClubs() {
  try {
    const { data } = await api("/clubs");
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

export async function getClubByID(clubID: Club["_id"]) {
  try {
    const { data } = await api(`/clubs/${clubID}`);
    console.log(data);
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

export async function changeStatusClub(id: Club["_id"]) {
  try {
    const { data } = await api.delete(`/clubs/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error delete club");
    }
    throw error;
  }
}

export async function createClub(formData: ClubFormData) {
  try {
    const { data } = await api.post(`/clubs`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error create club");
    }
    throw error;
  }
}
