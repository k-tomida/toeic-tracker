import type { scoreFormType } from "../types/scoreFormType";
import type { scoreType } from "../types/scoreType";
import { apiClient } from "./client";

export const getScore = async (): Promise<scoreType[]> => {
    const { data } = await apiClient.get("/scores");
    return data;
}

export const postScore = async (addScore: scoreFormType): Promise<scoreType> => {
    const { data } = await apiClient.post("/scores", addScore);
    return data;
}

type updateScoreType = {
    id: number;
    updateScore: scoreFormType
}

export const updateScore = async ({ id, updateScore }: updateScoreType): Promise<scoreType> => {
    const { data } = await apiClient.put(`/scores/${id}`, updateScore);
    return data;
}

export const deleteScore = async (id: number): Promise<void> => {
    await apiClient.delete(`/scores/${id}`);
}