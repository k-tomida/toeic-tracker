import type { studySessionFormType } from "../types/studySessionFormType";
import type { studySessionType } from "../types/studySessionType";
import { apiClient } from "./client";

export const getStudySession = async (): Promise<studySessionType[]> => {
    const { data } = await apiClient.get("/study-sessions")
    return data;
}


export const postStudySession = async (postStudySession: studySessionFormType): Promise<studySessionType> => {
    const { data } = await apiClient.post("/study-sessions", postStudySession)
    return data;
}

export type updateStudySessionType = {
    id: number;
    updateStudySession: studySessionFormType
}

export const updateStudySession = async ({ id, updateStudySession }: updateStudySessionType): Promise<studySessionType> => {
    const { data } = await apiClient.put(`/study-sessions/${id}`, updateStudySession);
    return data;
}

export const deleteStudySession = async (id: number): Promise<void> => {
    await apiClient.delete(`/study-sessions/${id}`);
}