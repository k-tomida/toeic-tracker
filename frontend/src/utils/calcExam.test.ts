import { afterEach, describe, expect, it, vi } from "vitest";
import { calcExamTimes, calcDaysUntilNextExam, } from "./calcExam";
import type { scoreType } from "../types/scoreType";

describe("calcExamTimes", () => {
    it("スコアが3件の場合、3を返す", () => {
        const scores = [
            {} as scoreType,
            {} as scoreType,
            {} as scoreType,
        ];

        expect(calcExamTimes(scores)).toBe(3);
    });

    it("スコアが空の場合、0を返す", () => {
        expect(calcExamTimes([])).toBe(0);
    });
});

describe("calcDaysUntilNextExam", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("試験日がnullの場合、nullを返す", () => {
        expect(calcDaysUntilNextExam(null)).toBeNull();
    });

    it("試験日が今日の場合、0を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-16T12:00:00"));

        expect(calcDaysUntilNextExam("2026-08-16")).toBe(0);
    });

    it("試験日が10日後の場合、10を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-16T12:00:00"));

        expect(calcDaysUntilNextExam("2026-08-26")).toBe(10);
    });

    it("試験日が1日前の場合、-1を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-16T12:00:00"));

        expect(calcDaysUntilNextExam("2026-08-15")).toBe(-1);
    });
});