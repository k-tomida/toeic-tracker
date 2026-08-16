import { afterEach, describe, expect, it, vi } from "vitest";
import { calcStreak, calcMaxStreak } from "./calcStreak";
import type { studySessionType } from "../types/studySessionType";

const createSession = (date: string): studySessionType => ({
    id: 1,
    date,
    category: "GRAMMAR",
    duration: 60,
    memo: "",
});

describe("calcStreak", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("今日から連続して学習している日数を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const studySessions = [
            createSession("2026-08-17"),
            createSession("2026-08-16"),
            createSession("2026-08-15"),
        ];

        expect(calcStreak(studySessions)).toBe(3);
    });

    it("今日学習していない場合、0を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const studySessions = [
            createSession("2026-08-16"),
            createSession("2026-08-15"),
        ];

        expect(calcStreak(studySessions)).toBe(0);
    });

    it("途中で学習していない日がある場合、その直前までの連続日数を返す", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const studySessions = [
            createSession("2026-08-17"),
            createSession("2026-08-16"),
            createSession("2026-08-14"),
        ];

        expect(calcStreak(studySessions)).toBe(2);
    });

    it("同じ日に複数回学習していても1日として数える", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-17T12:00:00"));

        const studySessions = [
            createSession("2026-08-17"),
            createSession("2026-08-17"),
            createSession("2026-08-16"),
            createSession("2026-08-16"),
            createSession("2026-08-15"),
        ];

        expect(calcStreak(studySessions)).toBe(3);
    });

    it("空配列の場合、0を返す", () => {
        expect(calcStreak([])).toBe(0);
    });
});

describe("calcMaxStreak", () => {
    it("最大連続学習日数を返す", () => {
        const studySessions = [
            createSession("2026-08-17"),
            createSession("2026-08-16"),
            createSession("2026-08-15"),
            createSession("2026-08-13"),
            createSession("2026-08-12"),
        ];

        expect(calcMaxStreak(studySessions)).toBe(3);
    });

    it("学習日が1日だけの場合、1を返す", () => {
        const studySessions = [
            createSession("2026-08-17"),
        ];

        expect(calcMaxStreak(studySessions)).toBe(1);
    });

    it("連続する学習日がない場合、1を返す", () => {
        const studySessions = [
            createSession("2026-08-17"),
            createSession("2026-08-15"),
            createSession("2026-08-13"),
        ];

        expect(calcMaxStreak(studySessions)).toBe(1);
    });

    it("同じ日に複数回学習していても1日として数える", () => {
        const studySessions = [
            createSession("2026-08-17"),
            createSession("2026-08-17"),
            createSession("2026-08-16"),
            createSession("2026-08-15"),
            createSession("2026-08-15"),
        ];

        expect(calcMaxStreak(studySessions)).toBe(3);
    });

    it("空配列の場合、0を返す", () => {
        expect(calcMaxStreak([])).toBe(0);
    });
});