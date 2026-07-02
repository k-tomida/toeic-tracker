import { dummyScoreData } from "../data/dummyScoreData";

export const calcTotalScore = (listening: number, reading: number): number => {
    return listening + reading;
}

export const calcScoreByNumber = (selectNumber: number): number => {
    if (selectNumber >= dummyScoreData.length) return 0;
    const sortScoreData = [...dummyScoreData].sort((a, b) => Date.parse(b.examDate) - Date.parse(a.examDate));
    return calcTotalScore(sortScoreData[selectNumber].listening, sortScoreData[selectNumber].reading);
}

export const calcBestScore = (): [number, number, number] => {
    let bestTotal = 0;
    let bestListening = 0;
    let bestReading = 0;

    dummyScoreData.forEach((d) => {
        const total = calcTotalScore(d.listening, d.reading);
        if (total > bestTotal) {
            bestTotal = total;
            bestListening = d.listening;
            bestReading = d.reading;
        }
    });

    return [bestListening, bestReading, bestTotal];
};

