import type { studySessionType } from "../types/studySessionType";
import { formatLocalDate } from "./formatDate";
import { sortTableByOrder } from "./sortData";

export const calcStreak = (studySessions: studySessionType[]): number => {
    const todayStr = formatLocalDate(new Date());
    const data = sortTableByOrder("newest", studySessions);
    if (data.length === 0) return 0;

    const uniqueData = data.filter((element, index, self) => self.findIndex(e => e.date === element.date) === index);

    if (uniqueData[0].date !== todayStr) return 0;

    let streak = 0;
    const currentDate = new Date();

    for (const session of uniqueData) {
        const expectedDateStr = formatLocalDate(currentDate);

        if (session.date !== expectedDateStr) {
            break;
        }

        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}

export const calcMaxStreak = (studySessions: studySessionType[]): number => {
    const data = sortTableByOrder("newest", studySessions);
    if (data.length === 0) return 0;

    const uniqueData = data.filter(
        (element, index, self) =>
            self.findIndex(e => e.date === element.date) === index
    );

    let maxStreak = 0;
    let currentStreak = 1;

    for (let i = 0; i < uniqueData.length - 1; i++) {
        const current = new Date(uniqueData[i].date);
        const next = new Date(uniqueData[i + 1].date);

        const diffDays = Math.round(
            (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            currentStreak++;
        } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
        }
    }
    return Math.max(maxStreak, currentStreak);
};