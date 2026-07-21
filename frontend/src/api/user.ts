import type { userType } from "../types/userType";
import { apiClient } from "./client";

export const getUser = async (): Promise<userType> => {
    const { data } = await apiClient.get("/users/me");
    return data;
}

export type UpdateUserRequest = {
    targetScore: number;
    nextExamDate: string;
};
export const updateUser=async(request: UpdateUserRequest): Promise<userType>=>{
    const {data}=await apiClient.put("/users/me", request);
    return data;
}