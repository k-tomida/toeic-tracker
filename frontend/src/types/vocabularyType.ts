export type vocabularyType = {
    id: string;
    word: string;
    class: "Noun" | "Verb" | "Adjective" | "Adverb" | "Preposition" | "Conjunction" | "AuxiliaryVerb";
    meaning: string;
    status: "acquired" | "unacquired";
};

