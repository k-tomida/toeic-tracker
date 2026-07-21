import type { studySessionType } from "../types/studySessionType";
import { apiClient } from "./client";

export const getStudySession = async (): Promise<studySessionType[]> => {
    const { data } = await apiClient.get("/study-sessions")
    return data;
}