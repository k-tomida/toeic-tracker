import { dummyVocabulary } from "../data/dummyVocabulary";
import type { vocabularyType } from "../types/vocabularyType";

export const countVocabulary = () => {
    return dummyVocabulary.length;
}

export const countAcquiredVocabulary = () => {
    let count = 0;
    dummyVocabulary.forEach((data) => {
        if (data.status === "acquired") {
            count++;
        }
    })
    return count;
}

export const countUnacquiredVocabulary = () => {
    let count = 0;
    dummyVocabulary.forEach((data) => {
        if (data.status === "unacquired") {
            count++;
        }
    })
    return count;
}

type scopeType = "all" | "unacquired";
type testCountType = "ten" | "twenty" | "all";

export const pickRandomWords = (words: vocabularyType[], scope: scopeType, count: testCountType): vocabularyType[] => {
    const copyArray = scope === "all" ? [...words] : [...words].filter((d) => d.status === "unacquired");

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
