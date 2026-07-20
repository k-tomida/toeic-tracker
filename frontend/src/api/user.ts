import type { userType } from "../types/userType";
import { apiClient } from "./client";

export const getUser = async (): Promise<userType> => {
    const { data } = await apiClient.get("/users/me");
    return data;

}