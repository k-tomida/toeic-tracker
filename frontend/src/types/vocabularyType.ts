export type vocabularyType = {
    id: string;
    word: string;
    class: wordClassType;
    meaning: string;
    status: statusType;
    date: string; // 追加日
    memo?: string;
};

export type wordClassType = "Noun" | "Verb" | "Adjective" | "Adverb" | "Preposition" | "Conjunction" | "AuxiliaryVerb";

export type statusType = "acquired" | "unacquired";

export type vocabularyOrderType = "newest" | "oldest" | "alphabetical";

