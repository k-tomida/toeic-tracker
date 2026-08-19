import { afterEach, describe, expect, it, vi } from "vitest";
import {
    calcStudyTimeInWeek,
    calcStudyTimeInMonth,
    calcStudyTimeAll,
    calcStudyTimeAverage,
    calcMonthsFromStart,
    calcStudyTimeByCategory,
} from "./calcStudyTime";
import type {
    categoryType,
    studySessionType,
} from "../types/studySessionType";

const createSession = (
    date: string,
    duration: number,
    category: categoryType = "GRAMMAR",
): studySessionType => ({
    id: 1,
    date,
    category,
    duration,
    memo: "",
});

afterEach(() => {
    vi.useRealTimers();
});

describe("calcStudyTimeInWeek", () => {
    it("指定した週の学習時間を時間単位で返す", () => {
        const data = [
            createSession("2026-08-17", 60),
            createSession("2026-08-18", 120),
            createSession("2026-08-20", 30),
        ];

        expect(
            calcStudyTimeInWeek(new Date("2026-08-19"), data)
        ).toBe(3.5);
    });

    it("指定した週以外の学習時間は含めない", () => {
        const data = [
            createSession("2026-08-10", 120),
            createSession("2026-08-17", 60),
        ];

        expect(
            calcStudyTimeInWeek(new Date("2026-08-19"), data)
        ).toBe(1);
    });

    it("空配列の場合、0を返す", () => {
        expect(
            calcStudyTimeInWeek(new Date("2026-08-19"), [])
        ).toBe(0);
    });
});

describe("calcStudyTimeInMonth", () => {
    it("指定した月の学習時間を時間単位で返す", () => {
        const data = [
            createSession("2026-08-01", 60),
            createSession("2026-08-15", 120),
            createSession("2026-08-31", 180),
        ];

        expect(
            calcStudyTimeInMonth(new Date("2026-08-20"), data)
        ).toBe(6);
    });

    it("指定した月以外の学習時間は含めない", () => {
        const data = [
            createSession("2026-07-31", 120),
            createSession("2026-08-01", 60),
            createSession("2026-09-01", 180),
        ];

        expect(
            calcStudyTimeInMonth(new Date("2026-08-20"), data)
        ).toBe(1);
    });

    it("空配列の場合、0を返す", () => {
        expect(
            calcStudyTimeInMonth(new Date("2026-08-20"), [])
        ).toBe(0);
    });
});

describe("calcStudyTimeAll", () => {
    it("全学習時間を時間単位で返す", () => {
        const data = [
            createSession("2026-08-01", 60),
            createSession("2026-08-02", 120),
            createSession("2026-08-03", 180),
        ];

        expect(calcStudyTimeAll(data)).toBe(6);
    });

    it("小数第1位まで計算する", () => {
        const data = [
            createSession("2026-08-01", 30),
        ];

        expect(calcStudyTimeAll(data)).toBe(0.5);
    });

    it("空配列の場合、0を返す", () => {
        expect(calcStudyTimeAll([])).toBe(0);
    });
});

describe("calcStudyTimeAverage", () => {
    it("1セッションあたりの平均学習時間を返す", () => {
        const data = [
            createSession("2026-08-01", 60),
            createSession("2026-08-02", 120),
            createSession("2026-08-03", 180),
        ];

        expect(calcStudyTimeAverage(data)).toBe(2);
    });

    it("平均値を小数第1位まで返す", () => {
        const data = [
            createSession("2026-08-01", 60),
            createSession("2026-08-02", 120),
            createSession("2026-08-03", 60),
        ];

        expect(calcStudyTimeAverage(data)).toBe(1.3);
    });

    it("空配列の場合、0を返す", () => {
        expect(calcStudyTimeAverage([])).toBe(0);
    });
});

describe("calcMonthsFromStart", () => {
    it("最初の学習日から現在までの経過月数を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const data = [
            createSession("2026-05-01", 60),
            createSession("2026-07-01", 60),
            createSession("2026-08-01", 60),
        ];

        expect(calcMonthsFromStart(data)).toBe(3);
    });

    it("同じ月に開始した場合、0を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const data = [
            createSession("2026-08-01", 60),
        ];

        expect(calcMonthsFromStart(data)).toBe(0);
    });

    it("年をまたいだ場合も正しく月数を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const data = [
            createSession("2025-12-01", 60),
        ];

        expect(calcMonthsFromStart(data)).toBe(8);
    });

    it("空配列の場合、0を返す", () => {
        expect(calcMonthsFromStart([])).toBe(0);
    });
});

describe("calcStudyTimeByCategory", () => {
    it("今月の指定したカテゴリーの学習時間を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const data = [
            createSession("2026-08-01", 60, "GRAMMAR"),
            createSession("2026-08-02", 120, "GRAMMAR"),
            createSession("2026-08-03", 180, "VOCABULARY"),
        ];

        expect(
            calcStudyTimeByCategory("GRAMMAR", data)
        ).toBe(3);
    });

    it("指定したカテゴリー以外の学習時間は含めない", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const data = [
            createSession("2026-08-01", 60, "GRAMMAR"),
            createSession("2026-08-02", 120, "VOCABULARY"),
        ];

        expect(
            calcStudyTimeByCategory("GRAMMAR", data)
        ).toBe(1);
    });

    it("先月の学習時間は含めない", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const data = [
            createSession("2026-07-31", 120, "GRAMMAR"),
            createSession("2026-08-01", 60, "GRAMMAR"),
        ];

        expect(
            calcStudyTimeByCategory("GRAMMAR", data)
        ).toBe(1);
    });

    it("空配列の場合、0を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        expect(
            calcStudyTimeByCategory("GRAMMAR", [])
        ).toBe(0);
    });
});