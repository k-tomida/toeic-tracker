import type { vocabularyFormType } from "../types/vocabularyFormType";
import type { sendTestType, vocabularyType, } from "../types/vocabularyType";
import { apiClient } from "./client";

export const getVocabulary = async (): Promise<vocabularyType[]> => {
    const { data } = await apiClient.get("/vocabularies");
    return data;
}


export const postVocabulary = async (addVocabulary: vocabularyFormType): Promise<vocabularyType> => {
    const { data } = await apiClient.post("/vocabularies", addVocabulary);
    return data;
}

export type updateVocabularyType = {
    id: number;
    updateVocabulary: vocabularyFormType;
}

export const updateVocabulary = async ({ id, updateVocabulary }: updateVocabularyType): Promise<vocabularyType> => {
    const { data } = await apiClient.put(`vocabularies/${id}`, updateVocabulary);
    return data;
}

export const deleteVocabulary = async (id: number): Promise<void> => {
    await apiClient.delete(`vocabularies/${id}`);
}

export const testVocabulary = async (test: sendTestType[]): Promise<vocabularyType[]> => {
    const { data } = await apiClient.put(`vocabularies/test`, test);
    return data;
}