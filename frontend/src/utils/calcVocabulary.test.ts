import { describe, expect, it } from "vitest";
import {
    countVocabulary,
    countVocabularyByStatus,
    pickRandomWords,
} from "./calcVocabulary";
import type {
    statusType,
    vocabularyType,
} from "../types/vocabularyType";

const createVocabulary = (
    id: number,
    status: statusType = "UNACQUIRED",
): vocabularyType => ({
    id,
    word: `word${id}`,
    wordClass: "NOUN",
    meaning: `meaning${id}`,
    status,
    createdAt: "2026-08-01",
});

const vocabularies: vocabularyType[] = [
    createVocabulary(1, "UNACQUIRED"),
    createVocabulary(2, "ACQUIRED"),
    createVocabulary(3, "UNACQUIRED"),
    createVocabulary(4, "ACQUIRED"),
    createVocabulary(5, "UNACQUIRED"),
];

describe("countVocabulary", () => {
    it("単語の件数を返す", () => {
        expect(countVocabulary(vocabularies)).toBe(5);
    });

    it("空配列の場合、0を返す", () => {
        expect(countVocabulary([])).toBe(0);
    });
});

describe("countVocabularyByStatus", () => {
    it("UNACQUIREDの単語数を返す", () => {
        expect(
            countVocabularyByStatus(vocabularies, "UNACQUIRED")
        ).toBe(3);
    });

    it("ACQUIREDの単語数を返す", () => {
        expect(
            countVocabularyByStatus(vocabularies, "ACQUIRED")
        ).toBe(2);
    });

    it("空配列の場合、0を返す", () => {
        expect(
            countVocabularyByStatus([], "ACQUIRED")
        ).toBe(0);
    });
});

describe("pickRandomWords", () => {
    it("allを指定した場合、すべての単語を対象にする", () => {
        const result = pickRandomWords(
            vocabularies,
            "all",
            "twenty"
        );

        expect(result).toHaveLength(5);
    });

    it("unacquiredを指定した場合、未習得の単語だけを対象にする", () => {
        const result = pickRandomWords(
            vocabularies,
            "unacquired",
            "ten"
        );

        expect(result).toHaveLength(3);

        result.forEach((word) => {
            expect(word.status).toBe("UNACQUIRED");
        });
    });

    it("指定した件数が単語数より多い場合、存在する単語数まで取得する", () => {
        const words = [
            createVocabulary(1),
            createVocabulary(2),
            createVocabulary(3),
        ];

        const result = pickRandomWords(
            words,
            "all",
            "twenty"
        );

        expect(result).toHaveLength(3);
    });

    it("tenを指定した場合、最大10件取得する", () => {
        const words = Array.from(
            { length: 15 },
            (_, index) => createVocabulary(index + 1)
        );

        const result = pickRandomWords(
            words,
            "all",
            "ten"
        );

        expect(result).toHaveLength(10);
    });

    it("twentyを指定した場合、最大20件取得する", () => {
        const words = Array.from(
            { length: 25 },
            (_, index) => createVocabulary(index + 1)
        );

        const result = pickRandomWords(
            words,
            "all",
            "twenty"
        );

        expect(result).toHaveLength(20);
    });

    it("同じ単語を重複して取得しない", () => {
        const words = Array.from(
            { length: 20 },
            (_, index) => createVocabulary(index + 1)
        );

        const result = pickRandomWords(
            words,
            "all",
            "twenty"
        );

        const ids = result.map((word) => word.id);

        expect(new Set(ids).size).toBe(ids.length);
    });

    it("元の配列を変更しない", () => {
        const original = [...vocabularies];

        pickRandomWords(
            vocabularies,
            "all",
            "ten"
        );

        expect(vocabularies).toEqual(original);
    });

    it("未習得の単語がない場合、空配列を返す", () => {
        const words = [
            createVocabulary(1, "ACQUIRED"),
            createVocabulary(2, "ACQUIRED"),
        ];

        const result = pickRandomWords(
            words,
            "unacquired",
            "ten"
        );

        expect(result).toEqual([]);
    });

    it("単語が空配列の場合、空配列を返す", () => {
        expect(
            pickRandomWords([], "all", "ten")
        ).toEqual([]);
    });
});