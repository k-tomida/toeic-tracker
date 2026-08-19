import { describe, expect, it } from "vitest";
import {
    formatDate,
    formatDateSlash,
    formatDateSlashAndRemoveDay,
} from "./formatDate";

describe("formatDate", () => {
    it("日付をMM/DD(曜日)形式に変換する", () => {
        expect(formatDate("2026-06-16")).toBe("06/16(火)");
    });

    it("日曜日の場合、曜日を日として返す", () => {
        expect(formatDate("2026-06-14")).toBe("06/14(日)");
    });

    it("土曜日の場合、曜日を土として返す", () => {
        expect(formatDate("2026-06-20")).toBe("06/20(土)");
    });
});

describe("formatDateSlash", () => {
    it("日付をYYYY/MM/DD(曜日)形式に変換する", () => {
        expect(formatDateSlash("2026-06-16")).toBe(
            "2026/06/16(火)"
        );
    });

    it("日曜日の場合、曜日を日として返す", () => {
        expect(formatDateSlash("2026-06-14")).toBe(
            "2026/06/14(日)"
        );
    });

    it("土曜日の場合、曜日を土として返す", () => {
        expect(formatDateSlash("2026-06-20")).toBe(
            "2026/06/20(土)"
        );
    });
});

describe("formatDateSlashAndRemoveDay", () => {
    it("日付をYYYY/MM形式に変換する", () => {
        expect(
            formatDateSlashAndRemoveDay("2026-06-16")
        ).toBe("2026/06");
    });

    it("月が1桁でもYYYY/MM形式で返す", () => {
        expect(
            formatDateSlashAndRemoveDay("2026-01-01")
        ).toBe("2026/01");
    });
});