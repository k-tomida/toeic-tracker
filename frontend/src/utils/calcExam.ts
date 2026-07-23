import type { scoreType } from "../types/scoreType";

export const calcExamTimes = (scores: scoreType[]): number => {
    return scores.length;
}

export const calcDaysUntilNextExam = (nextExamDate: string | null): number | null => {
    if (!nextExamDate) return null;

    const today = new Date();
    const examDate = new Date(nextExamDate);
    const diffMs = examDate.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};