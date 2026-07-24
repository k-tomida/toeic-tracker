export type vocabularyType = {
    id: number;
    word: string;
    wordClass: wordClassType;
    meaning: string;
    status: statusType;
    createdAt: string; // 追加日
    memo?: string;
};

export type wordClassType =
    | "NOUN"
    | "VERB"
    | "ADJECTIVE"
    | "ADVERB"
    | "PREPOSITION"
    | "CONJUNCTION"
    | "AUXILIARY_VERB";

export type statusType = "ACQUIRED" | "UNACQUIRED";

export type vocabularyOrderType = "newest" | "oldest" | "alphabetical";

export type scopeType = "all" | "unacquired";

export type testCountType = "ten" | "twenty" | "all";

