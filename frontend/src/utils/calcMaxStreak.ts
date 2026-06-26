import { dummyStudySessions } from "../data/dummyStudySession";
import { sortTableByOrder } from "./sortTableByOrder";
import type { tableType } from "../types/tableType";

export const calcMaxStreak = (): number => {
    const data = sortTableByOrder("newest", dummyStudySessions);
    if (data.length === 0) return 0;

    const uniqueData: tableType[] = data.filter(
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