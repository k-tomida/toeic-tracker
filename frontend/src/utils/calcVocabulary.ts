import type { scopeType, statusType, testCountType, vocabularyType } from "../types/vocabularyType";

export const countVocabulary = (vocabularies: vocabularyType[]) => {
    return vocabularies.length;
}

export const countVocabularyByStatus = (vocabularies: vocabularyType[], status: statusType) => {
    let count = 0;
    vocabularies.forEach((data) => {
        if (data.status === status) {
            count++;
        }
    })
    return count;
}


export const pickRandomWords = (words: vocabularyType[], scope: scopeType, count: testCountType): vocabularyType[] => {
    const copyArray = scope === "all" ? [...words] : [...words].filter((d) => d.status === "UNACQUIRED");

    const changeTestToNumber: Record<testCountType, number> = {
        "ten": 10,
        "twenty": 20,
        "all": copyArray.length
    };
    const target = Math.min(changeTestToNumber[count], copyArray.length);

    const randomArray = [...Array(target)].map(() => {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        return copyArray.splice(randomIndex, 1)[0];
    });

    return randomArray;
}
