import type { categoryType, studySessionType } from "../types/studySessionType";
import { sortTableByOrder } from "./sortTableByOrder";

export const calcStudyTimeInWeek = (day: Date, data: studySessionType[]): number => {
    const start = new Date(day);
    start.setDate(day.getDate() - day.getDay());
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    let count = 0;

    data.forEach((d) => {
        const date = new Date(d.date);
        if (date >= start && date < end) {
            count += d.duration;
        }
    });

    return Math.round(count / 60);
};

export const calcStudyTimeInMonth = (day: Date, data: studySessionType[]): number => {
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

export const calcStudyTimeAll = (data: studySessionType[]): number => {
    let count = 0;
    data.forEach((d) => {
        count += d.duration;
    })

    return Math.round(count / 60);
}

export const calcStudyTimeAverage = (data: studySessionType[]): number => {
    if (data.length === 0) return 0;
    return Math.round(calcStudyTimeAll(data) / data.length * 10) / 10;
}

export const calcMonthsFromStart = (data: studySessionType[]): number => {
    if (data.length === 0) return 0;
    const today = new Date();
    const sortData = sortTableByOrder("oldest", data);
    const startDate = new Date(sortData[0].date);
    const years = today.getFullYear() - startDate.getFullYear();
    const months = today.getMonth() - startDate.getMonth();
    return years * 12 + months;
}

export const calcStudyTimeByCategory = (category: categoryType, data: studySessionType[]): number => {
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    let count = 0;

    data.forEach((d) => {
        const date = new Date(d.date);
        if (thisMonth === date.getMonth() + 1 && thisYear === date.getFullYear()) {
            if (d.category.includes(category)) {
                count += d.duration;
            }
        }
    })
    return Math.round(count / 60);
}

