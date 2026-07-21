import type { categoryType } from "./categoryType";

export type tableType = {
    id: string;
    date: string;
    category: categoryType;
    duration: number;
    memo: string;
}