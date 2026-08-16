import type { scoreType } from "../types/scoreType";

export const calcExamTimes = (scores: scoreType[]): number => {
    return scores.length;
}

export const calcDaysUntilNextExam = (nextExamDate: string | null): number | null => {
    if (!nextExamDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = nextExamDate.split("-").map(Number);
    const examDate = new Date(year, month - 1, day);

    const diffMs = examDate.getTime() - today.getTime();

    return Math.round(diffMs / (1000 * 60 * 60 * 24));
};