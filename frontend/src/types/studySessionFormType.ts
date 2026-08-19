import type { categoryType } from "./studySessionType";

export type studySessionFormType = {
    date: string;
    duration: number;
    category: categoryType;
    memo: string;
}