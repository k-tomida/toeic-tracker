import type { statusType, vocabularyType, wordClassType } from "../types/vocabularyType";
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