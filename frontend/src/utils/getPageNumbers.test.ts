import { describe, expect, it } from "vitest";
import { getPageNumbers } from "./getPageNumbers";

describe("getPageNumbers", () => {
    it("総ページ数が7以下の場合、すべてのページ番号を返す", () => {
        expect(getPageNumbers(1, 7)).toEqual([
            1, 2, 3, 4, 5, 6, 7,
        ]);
    });

    it("総ページ数が1の場合、1だけを返す", () => {
        expect(getPageNumbers(1, 1)).toEqual([1]);
    });

    it("現在ページが先頭付近の場合、1〜5と省略記号と最終ページを返す", () => {
        expect(getPageNumbers(3, 10)).toEqual([
            1, 2, 3, 4, 5, "...", 10,
        ]);
    });

    it("現在ページが4の場合、先頭付近として表示する", () => {
        expect(getPageNumbers(4, 10)).toEqual([
            1, 2, 3, 4, 5, "...", 10,
        ]);
    });

    it("現在ページが中央の場合、現在ページの前後と省略記号を返す", () => {
        expect(getPageNumbers(5, 10)).toEqual([
            1, "...", 4, 5, 6, "...", 10,
        ]);
    });

    it("現在ページが末尾付近の場合、先頭ページと省略記号と最後の5ページを返す", () => {
        expect(getPageNumbers(8, 10)).toEqual([
            1, "...", 6, 7, 8, 9, 10,
        ]);
    });

    it("現在ページが最終ページの場合、最後の5ページを返す", () => {
        expect(getPageNumbers(10, 10)).toEqual([
            1, "...", 6, 7, 8, 9, 10,
        ]);
    });
});