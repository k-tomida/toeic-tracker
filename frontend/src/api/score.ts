import type { scoreType } from "../types/scoreType";
import { apiClient } from "./client";

export const getScore = async (): Promise<scoreType[]> => {
    const { data } = await apiClient.get("/scores");
    return data;
}