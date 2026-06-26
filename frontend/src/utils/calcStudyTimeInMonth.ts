import { dummyStudySessions } from "../data/dummyStudySession"

export const calcStudyTimeInMonth = (day: Date): number => {
    const data = dummyStudySessions;
    const thisMonth = day.getMonth() + 1;
    const thisYear = day.getFullYear();
    let count = 0;

    data.forEach((d) => {
        const date = new Date(d.date);
        if (thisMonth === date.getMonth() + 1 && thisYear === date.getFullYear()) {
            count += d.duration;
        }
    })
    return Math.round(count / 60);

}