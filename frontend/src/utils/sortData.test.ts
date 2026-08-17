import { describe, expect, it } from "vitest";
import {
    sortTableByOrder,
    sortScoreByNewest,
    sortScoreByOldest,
    sortVocabularyByOrder,
} from "./sortData";
import type { studySessionType } from "../types/studySessionType";
import type { scoreType } from "../types/scoreType";
import type { vocabularyType } from "../types/vocabularyType";

const studySessions: studySessionType[] = [
    {
        id: 1,
        date: "2026-08-01",
        category: "GRAMMAR",
        duration: 60,
        memo: "",
    },
    {
        id: 2,
        date: "2026-06-01",
        category: "VOCABULARY",
        duration: 120,
        memo: "",
    },
    {
        id: 3,
        date: "2026-07-01",
        category: "LISTENING",
        duration: 30,
        memo: "",
    },
];

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

const vocabularies: vocabularyType[] = [
    {
        id: 1,
        word: "banana",
        wordClass: "NOUN",
        meaning: "バナナ",
        status: "UNACQUIRED",
        createdAt: "2026-08-01",
    },
    {
        id: 2,
        word: "apple",
        wordClass: "NOUN",
        meaning: "りんご",
        status: "ACQUIRED",
        createdAt: "2026-06-01",
    },
    {
        id: 3,
        word: "cat",
        wordClass: "NOUN",
        meaning: "猫",
        status: "UNACQUIRED",
        createdAt: "2026-07-01",
    },
];

describe("sortTableByOrder", () => {
    it("newestの場合、新しい日付順に並べる", () => {
        const result = sortTableByOrder("newest", studySessions);

        expect(result.map((data) => data.id)).toEqual([
            1, 3, 2,
        ]);
    });

    it("oldestの場合、古い日付順に並べる", () => {
        const result = sortTableByOrder("oldest", studySessions);

        expect(result.map((data) => data.id)).toEqual([
            2, 3, 1,
        ]);
    });

    it("longestの場合、学習時間が長い順に並べる", () => {
        const result = sortTableByOrder("longest", studySessions);

        expect(result.map((data) => data.id)).toEqual([
            2, 1, 3,
        ]);
    });

    it("元の配列を変更しない", () => {
        const original = [...studySessions];

        sortTableByOrder("newest", studySessions);

        expect(studySessions).toEqual(original);
    });

    it("空配列の場合、空配列を返す", () => {
        expect(sortTableByOrder("newest", [])).toEqual([]);
    });
});

describe("sortScoreByNewest", () => {
    it("スコアを試験日の新しい順に並べる", () => {
        const result = sortScoreByNewest(scores);

        expect(result.map((data) => data.id)).toEqual([
            1, 3, 2,
        ]);
    });

    it("元の配列を変更しない", () => {
        const original = [...scores];

        sortScoreByNewest(scores);

        expect(scores).toEqual(original);
    });

    it("空配列の場合、空配列を返す", () => {
        expect(sortScoreByNewest([])).toEqual([]);
    });
});

describe("sortScoreByOldest", () => {
    it("スコアを試験日の古い順に並べる", () => {
        const result = sortScoreByOldest(scores);

        expect(result.map((data) => data.id)).toEqual([
            2, 3, 1,
        ]);
    });

    it("元の配列を変更しない", () => {
        const original = [...scores];

        sortScoreByOldest(scores);

        expect(scores).toEqual(original);
    });

    it("空配列の場合、空配列を返す", () => {
        expect(sortScoreByOldest([])).toEqual([]);
    });
});

describe("sortVocabularyByOrder", () => {
    it("newestの場合、追加日の新しい順に並べる", () => {
        const result = sortVocabularyByOrder(
            "newest",
            vocabularies
        );

        expect(result.map((data) => data.id)).toEqual([
            1, 3, 2,
        ]);
    });

    it("oldestの場合、追加日の古い順に並べる", () => {
        const result = sortVocabularyByOrder(
            "oldest",
            vocabularies
        );

        expect(result.map((data) => data.id)).toEqual([
            2, 3, 1,
        ]);
    });

    it("alphabeticalの場合、単語をアルファベット順に並べる", () => {
        const result = sortVocabularyByOrder(
            "alphabetical",
            vocabularies
        );

        expect(result.map((data) => data.word)).toEqual([
            "apple",
            "banana",
            "cat",
        ]);
    });

    it("元の配列を変更しない", () => {
        const original = [...vocabularies];

        sortVocabularyByOrder(
            "alphabetical",
            vocabularies
        );

        expect(vocabularies).toEqual(original);
    });

    it("空配列の場合、空配列を返す", () => {
        expect(
            sortVocabularyByOrder("newest", [])
        ).toEqual([]);
    });
});