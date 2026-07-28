import type { sendTestType, statusType, vocabularyType, wordClassType } from "../types/vocabularyType";
import { apiClient } from "./client";

export const getVocabulary = async (): Promise<vocabularyType[]> => {
    const { data } = await apiClient.get("/vocabularies");
    return data;
}

type addiVocabularyType = {
    userId: number;
    word: string;
    wordClass: wordClassType;
    meaning: string;
    status: statusType;
    memo: string;
}

export const postVocabulary = async (addVocabulary: addiVocabularyType): Promise<vocabularyType> => {
    const { data } = await apiClient.post("/vocabularies", addVocabulary);
    return data;
}

type updateVocabularyType = {
    id: number;
    updateVocabulary: addiVocabularyType;
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