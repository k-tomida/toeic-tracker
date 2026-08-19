import { afterEach, describe, expect, it, vi } from "vitest";
import { changeTableByPeriod } from "./changeTableByPeriod";
import type { studySessionType } from "../types/studySessionType";

const createSession = (
    id: number,
    date: string,
): studySessionType => ({
    id,
    date,
    category: "GRAMMAR",
    duration: 60,
    memo: "",
});

afterEach(() => {
    vi.useRealTimers();
});

describe("changeTableByPeriod", () => {
    describe("all", () => {
        it("すべての学習記録を返す", () => {
            const data = [
                createSession(1, "2026-08-17"),
                createSession(2, "2026-07-15"),
                createSession(3, "2026-06-10"),
            ];

            expect(
                changeTableByPeriod("all", data)
            ).toEqual(data);
        });

        it("空配列の場合、空配列を返す", () => {
            expect(
                changeTableByPeriod("all", [])
            ).toEqual([]);
        });
    });

    describe("thisMonth", () => {
        it("今月の学習記録だけを返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-08-17T12:00:00"));

            const data = [
                createSession(1, "2026-08-01"),
                createSession(2, "2026-08-17"),
                createSession(3, "2026-07-31"),
                createSession(4, "2026-09-01"),
            ];

            const result = changeTableByPeriod(
                "thisMonth",
                data
            );

            expect(result).toEqual([
                data[0],
                data[1],
            ]);
        });

        it("空配列の場合、空配列を返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-08-17T12:00:00"));

            expect(
                changeTableByPeriod("thisMonth", [])
            ).toEqual([]);
        });
    });

    describe("lastMonth", () => {
        it("先月の学習記録だけを返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-08-17T12:00:00"));

            const data = [
                createSession(1, "2026-07-01"),
                createSession(2, "2026-07-31"),
                createSession(3, "2026-08-01"),
                createSession(4, "2026-06-30"),
            ];

            const result = changeTableByPeriod(
                "lastMonth",
                data
            );

            expect(result).toEqual([
                data[0],
                data[1],
            ]);
        });

        it("前年の同じ月は含めない", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-08-17T12:00:00"));

            const data = [
                createSession(1, "2026-07-01"),
                createSession(2, "2025-07-01"),
                createSession(3, "2026-08-01"),
            ];

            const result = changeTableByPeriod("lastMonth", data);

            expect(result).toEqual([
                data[0],
            ]);
        });

        it("1月の場合、前年12月の学習記録を返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-01-15T12:00:00"));

            const data = [
                createSession(1, "2025-12-01"),
                createSession(2, "2025-12-31"),
                createSession(3, "2026-01-01"),
                createSession(4, "2025-11-30"),
            ];

            const result = changeTableByPeriod(
                "lastMonth",
                data
            );

            expect(result).toEqual([
                data[0],
                data[1],
            ]);
        });
    });

    describe("lastThreeMonth", () => {
        it("今月を含む直近3か月の学習記録を返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-08-17T12:00:00"));

            const data = [
                createSession(1, "2026-08-01"),
                createSession(2, "2026-07-01"),
                createSession(3, "2026-06-01"),
                createSession(4, "2026-05-31"),
                createSession(5, "2026-09-01"),
            ];

            const result = changeTableByPeriod(
                "lastThreeMonth",
                data
            );

            expect(result).toEqual([
                data[0],
                data[1],
                data[2],
            ]);
        });

        it("2月の場合、前年12月から2月までの学習記録を返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-02-15T12:00:00"));

            const data = [
                createSession(1, "2025-12-01"),
                createSession(2, "2026-01-01"),
                createSession(3, "2026-02-01"),
                createSession(4, "2025-11-01"),
                createSession(5, "2026-03-01"),
            ];

            const result = changeTableByPeriod(
                "lastThreeMonth",
                data
            );

            expect(result).toEqual([
                data[0],
                data[1],
                data[2],
            ]);
        });

        it("1月の場合、前年11月から1月までの学習記録を返す", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-01-15T12:00:00"));

            const data = [
                createSession(1, "2025-11-01"),
                createSession(2, "2025-12-01"),
                createSession(3, "2026-01-01"),
                createSession(4, "2025-10-01"),
                createSession(5, "2026-02-01"),
            ];

            const result = changeTableByPeriod(
                "lastThreeMonth",
                data
            );

            expect(result).toEqual([
                data[0],
                data[1],
                data[2],
            ]);
        });
    });
});