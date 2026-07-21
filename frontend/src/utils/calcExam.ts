import { dummyScoreData } from "../data/dummyScoreData";

export const calcExamTimes = (): number => {
    return dummyScoreData.length;
}

export const calcDaysUntilNextExam = (nextExamDate: string|null): number | null => {
    if (!nextExamDate) return null;

    const today = new Date();
    const examDate = new Date(nextExamDate);
    const diffMs = examDate.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};