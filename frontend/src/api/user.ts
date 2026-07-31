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
export const updateUser = async (request: UpdateUserRequest): Promise<userType> => {
    const { data } = await apiClient.put("/users/me", request);
    return data;
}

export type LoginRequest = {
    email: string;
    password: string;
}

type LoginResponse = {
    token: string; // バックエンドのフィールド名に合わせる(accessTokenかもしれない)
};

//tokenを返す
export const login = async (request: LoginRequest): Promise<string> => {
    const { data } = await apiClient.post<LoginResponse>("/login", request);
    return data.token;
}