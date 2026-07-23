import type { scoreType } from "../types/scoreType";
import { formatDateSlashAndRemoveDay } from "./formatDate";
import { sortScoreByOldest } from "./sortTableByOrder";

type chartType = {
    id: number;
    examDate: string;
    total: number;
}

type trendChartType = {
    id: number;
    examDate: string;
    total: number;
    listening: number;
    reading: number;
}

export const formatChartData = (scores: scoreType[]): chartType[] => {
    const chartData = sortScoreByOldest(scores).slice(0, 5).map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.totalScore
    }));
    return chartData;
}

export const formatTrendChartData = (scores: scoreType[]): trendChartType[] => {
    const chartData = sortScoreByOldest(scores).map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.totalScore,
        listening: d.listeningScore,
        reading: d.readingScore
    }));
    return chartData;
}