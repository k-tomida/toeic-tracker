import type { categoryType, studySessionType } from "../types/studySessionType";
import { apiClient } from "./client";

export const getStudySession = async (): Promise<studySessionType[]> => {
    const { data } = await apiClient.get("/study-sessions")
    return data;
}

type apiStudySessionType = {
    userId: number;
    date: string;
    duration: number;
    category: categoryType;
    memo: string;
}

export const postStudySession = async (postStudySession: apiStudySessionType): Promise<studySessionType> => {
    const { data } = await apiClient.post("/study-sessions", postStudySession)
    return data;
}

type updateStudySessionType = {
    id: number;
    updateStudySession: apiStudySessionType
}

export const updateStudySession = async ({ id, updateStudySession }: updateStudySessionType): Promise<studySessionType> => {
    const { data } = await apiClient.put(`/study-sessions/${id}`, updateStudySession);
    return data;
}

export const deleteStudySession = async (id: number): Promise<void> => {
    await apiClient.delete(`/study-sessions/${id}`);
}