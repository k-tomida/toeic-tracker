import { dummyVocabulary } from "../data/dummyVocabulary";

export const countVocabulary = () => {
    return dummyVocabulary.length;
}

export const countAcquiredVocabulary = () => {
    let count = 0;
    dummyVocabulary.forEach((data) => {
        if (data.status) {
            count++;
        }
    })
    return count;
}

export const countUnacquiredVocabulary = () => {
    let count = 0;
    dummyVocabulary.forEach((data) => {
        if (!data.status) {
            count++;
        }
    })
    return count;
}
