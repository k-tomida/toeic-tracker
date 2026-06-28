import { calcStudyTimeInMonth } from "./calcStudyTime";

export const calcDiffDay = (lastDay: Date): string => {
    const today = new Date();
    const diff = calcStudyTimeInMonth(today) - calcStudyTimeInMonth(lastDay);
    const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
    return diffStr;
}