import type { scoreType } from "../types/scoreType";
import { formatDateSlash } from "./formatDate";

export const calcScoreByNumber = (selectNumber: number, scores: scoreType[]): number => {
    if (selectNumber >= scores.length) return 0;
    const sortScoreData = [...scores].sort((a, b) => Date.parse(b.examDate) - Date.parse(a.examDate));
    return sortScoreData[selectNumber].listeningScore + sortScoreData[selectNumber].readingScore;
};

export const calcBestScore = (scores: scoreType[]): [number, number, number] => {
    let bestTotal = 0;
    let bestListening = 0;
    let bestReading = 0;

    scores.forEach((d) => {
        if (d.totalScore > bestTotal) {
            bestTotal = d.totalScore;
            bestListening = d.listeningScore;
            bestReading = d.readingScore;
        }
    });

    return [bestTotal, bestListening, bestReading];
};

export const calcBestScoreAndDate = (scores: scoreType[]): [number, string] => {
    let best = 0;
    let date = "";
    scores.forEach((d) => {
        if (d.totalScore > best) {
            best = d.totalScore;
            date = d.examDate
        }
    });
    date = formatDateSlash(date);

    return [best, date];
};