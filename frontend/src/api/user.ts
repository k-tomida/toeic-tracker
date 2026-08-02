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

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    name: string;
    password: string;
    targetScore: number | null;
    nextExamDate: string | null;
};

export type UpdateNameRequest = {
    name: string
}
export type UpdatePasswordRequest = {
    currentPassword: string
    newPassword: string
}


export const updateUser = async (request: UpdateUserRequest): Promise<userType> => {
    const { data } = await apiClient.put("/users/me", request);
    console.log(data);
    return data;
}

type tokenResponse = {
    token: string; // バックエンドのフィールド名に合わせる(accessTokenかもしれない)
};

//tokenを返す
export const login = async (request: LoginRequest): Promise<string> => {
    const { data } = await apiClient.post<tokenResponse>("/login", request);
    return data.token;
}

export const register = async (request: RegisterRequest): Promise<string> => {
    const { data } = await apiClient.post<tokenResponse>("/register", request);
    return data.token;
}

export const updateName = async (request: UpdateNameRequest): Promise<userType> => {
    const { data } = await apiClient.put("/users/name", request);
    return data;
}

export const updatePassword = async (request: UpdatePasswordRequest): Promise<string> => {
    const { data } = await apiClient.put<tokenResponse>("/users/password", request);
    return data.token;
}