import { describe, expect, it } from "vitest";
import {
    formatChartData,
    formatTrendChartData,
} from "./formatChartData";
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
        examDate: "2026-06-01",
        listeningScore: 450,
        readingScore: 400,
        totalScore: 850,
    },
    {
        id: 3,
        examDate: "2026-07-01",
        listeningScore: 350,
        readingScore: 300,
        totalScore: 650,
    },
];

describe("formatChartData", () => {
    it("スコアを古い日付順にチャートデータへ変換する", () => {
        const result = formatChartData(scores);

        expect(result).toEqual([
            {
                id: 2,
                examDate: "2026/06",
                total: 850,
            },
            {
                id: 3,
                examDate: "2026/07",
                total: 650,
            },
            {
                id: 1,
                examDate: "2026/08",
                total: 750,
            },
        ]);
    });

    it("6件以上ある場合、直近5件を古い日付順に返す", () => {
        const scores: scoreType[] = [
            {
                id: 1,
                examDate: "2026-01-01",
                listeningScore: 300,
                readingScore: 300,
                totalScore: 600,
            },
            {
                id: 2,
                examDate: "2026-02-01",
                listeningScore: 310,
                readingScore: 310,
                totalScore: 620,
            },
            {
                id: 3,
                examDate: "2026-03-01",
                listeningScore: 320,
                readingScore: 320,
                totalScore: 640,
            },
            {
                id: 4,
                examDate: "2026-04-01",
                listeningScore: 330,
                readingScore: 330,
                totalScore: 660,
            },
            {
                id: 5,
                examDate: "2026-05-01",
                listeningScore: 340,
                readingScore: 340,
                totalScore: 680,
            },
            {
                id: 6,
                examDate: "2026-06-01",
                listeningScore: 350,
                readingScore: 350,
                totalScore: 700,
            },
        ];

        const result = formatChartData(scores);

        expect(result).toHaveLength(5);

        expect(result.map((data) => data.id)).toEqual([
            2, 3, 4, 5, 6,
        ]);
    });

    it("5件以下の場合、すべて返す", () => {
        const result = formatChartData(scores);

        expect(result).toHaveLength(3);
    });

    it("空配列の場合、空配列を返す", () => {
        expect(formatChartData([])).toEqual([]);
    });
});

describe("formatTrendChartData", () => {
    it("スコアを古い日付順にトレンドチャートデータへ変換する", () => {
        const result = formatTrendChartData(scores);

        expect(result).toEqual([
            {
                id: 2,
                examDate: "2026/06",
                total: 850,
                listening: 450,
                reading: 400,
            },
            {
                id: 3,
                examDate: "2026/07",
                total: 650,
                listening: 350,
                reading: 300,
            },
            {
                id: 1,
                examDate: "2026/08",
                total: 750,
                listening: 400,
                reading: 350,
            },
        ]);
    });

    it("5件を超えてもすべて返す", () => {
        const scores: scoreType[] = Array.from(
            { length: 6 },
            (_, index) => ({
                id: index + 1,
                examDate: `2026-0${index + 1}-01`,
                listeningScore: 300,
                readingScore: 300,
                totalScore: 600,
            })
        );

        const result = formatTrendChartData(scores);

        expect(result).toHaveLength(6);
    });

    it("空配列の場合、空配列を返す", () => {
        expect(formatTrendChartData([])).toEqual([]);
    });
});