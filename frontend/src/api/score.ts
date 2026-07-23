import type { scoreType } from "../types/scoreType";
import { apiClient } from "./client";

export const getScore = async (): Promise<scoreType[]> => {
    const { data } = await apiClient.get("/scores");
    return data;
}

type addScoreType = {
    userId: number;
    examDate: string;
    listeningScore: number;
    readingScore: number;
    memo: string;
}

export const postScore = async (addScore: addScoreType): Promise<scoreType> => {
    const { data } = await apiClient.post("/scores", addScore);
    return data;
}

type updateScoreType = {
    id: number;
    updateScore: addScoreType;
}

export const updateScore = async ({ id, updateScore }: updateScoreType): Promise<scoreType> => {
    const { data } = await apiClient.put(`/scores/${id}`, updateScore);
    return data;
}

export const deleteScore = async (id: number): Promise<void> => {
    await apiClient.delete(`/scores/${id}`);
}