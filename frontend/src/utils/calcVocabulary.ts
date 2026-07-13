import { dummyVocabulary } from "../data/dummyVocabulary";

export const countVocabulary = () => {
    return dummyVocabulary.length;
}

export const countAquiredVocabulary = () => {
    let count = 0;
    dummyVocabulary.forEach((data) => {
        if (data.status) {
            count++;
        }
    })
    return count;
}

export const countUnaquiredVocabulary = () => {
    let count = 0;
    dummyVocabulary.forEach((data) => {
        if (!data.status) {
            count++;
        }
    })
    return count;
}
