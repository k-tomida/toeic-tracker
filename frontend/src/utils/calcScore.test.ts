import { describe, expect, it } from "vitest";
import { calcScoreByNumber, calcBestScore, calcBestScoreAndDate } from "./calcScore";
import type { scoreType } from "../types/scoreType";

const scores: scoreType[] = [
    {
        id: 1,
        examDate: "2026-08-01",
        listeningScore: 400,
        readingScore: 350,
        totalScore: 750,
    },
    {
        id: 2,
        examDate: "2026-07-01",
        listeningScore: 450,
        readingScore: 400,
        totalScore: 850,
    },
    {
        id: 3,
        examDate: "2026-06-01",
        listeningScore: 350,
        readingScore: 300,
        totalScore: 650,
    },
];

describe("calcScoreByNumber", () => {
    it("0番目のスコアのListeningとReadingの合計を返す", () => {
        expect(calcScoreByNumber(0, scores)).toBe(750);
    });

    it("1番目のスコアのListeningとReadingの合計を返す", () => {
        expect(calcScoreByNumber(1, scores)).toBe(850);
    });

    it("指定した番号がスコア件数以上の場合、0を返す", () => {
        expect(calcScoreByNumber(3, scores)).toBe(0);
    });

    it("空配列の場合、0を返す", () => {
        expect(calcScoreByNumber(0, [])).toBe(0);
    });

    it("元のscores配列を変更しない", () => {
        const original = [...scores];

        calcScoreByNumber(0, scores);

        expect(scores).toEqual(original);
    });
});

describe("calcBestScore", () => {
    it("最高スコアとそのListening、Readingを返す", () => {
        expect(calcBestScore(scores)).toEqual([850, 450, 400]);
    });

    it("空配列の場合、すべて0を返す", () => {
        expect(calcBestScore([])).toEqual([0, 0, 0]);
    });
});

describe("calcBestScoreAndDate", () => {
    it("最高スコアとその試験日を返す", () => {
        expect(calcBestScoreAndDate(scores)).toEqual([
            850,
            "2026/07/01(水)",
        ]);
    });

    it("空配列の場合、0と空文字を返す", () => {
        expect(calcBestScoreAndDate([])).toEqual([0, ""]);
    });

    it("最高スコアが先頭にある場合、そのスコアと試験日を返す", () => {
        const scores = [
            {
                id: 1,
                examDate: "2026-08-01",
                listeningScore: 495,
                readingScore: 490,
                totalScore: 985,
            },
            {
                id: 2,
                examDate: "2026-07-01",
                listeningScore: 400,
                readingScore: 350,
                totalScore: 750,
            },
        ] as scoreType[];

        expect(calcBestScoreAndDate(scores)).toEqual([
            985,
            "2026/08/01(土)",
        ]);
    });
});