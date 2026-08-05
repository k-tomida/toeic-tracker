import type { statusType, wordClassType } from "./vocabularyType";

export type vocabularyFormType = {
    word: string;
    wordClass: wordClassType;
    meaning: string;
    status: statusType;
    memo: string;
}