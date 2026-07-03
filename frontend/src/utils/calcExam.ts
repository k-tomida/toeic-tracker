import { dummyScoreData } from "../data/dummyScoreData";
import { dummyUser } from "../data/dummyUser";

export const calcExamTimes = (): number => {
    return dummyScoreData.length;
}

export const calcDaysUntilNextExam = (): number | null => {
    if (!dummyUser.nextExamDate) return null;

    const today = new Date();
    const examDate = new Date(dummyUser.nextExamDate);
    const diffMs = examDate.getTime() - today.getTime();

    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};