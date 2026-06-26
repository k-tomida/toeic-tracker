import { dummyStudySessions } from "../data/dummyStudySession";
import type { tableType } from "../types/tableType";
import { sortTableByOrder } from "./sortTableByOrder";

export const calcStreak = (): number => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const data = sortTableByOrder("newest", dummyStudySessions);
    if (data.length === 0) return 0;

    const uniqueData: tableType[] = data.filter((element, index, self) => self.findIndex(e => e.date === element.date) === index);

    if (uniqueData[0].date !== todayStr) return 0;

    // 4. Count consecutive days from today backwards
    let streak = 0;
    const currentDate = new Date(todayStr);

    for (const session of uniqueData) {
        const sessionDateStr = session.date;
        const expectedDateStr = currentDate.toISOString().slice(0, 10);

        if (sessionDateStr !== expectedDateStr) {
            break;
        }

        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;

}