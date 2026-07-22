import type { scoreType } from "../types/scoreType";
import { formatDateSlashAndRemoveDay } from "./formatDate";

type chartType = {
    id: string;
    examDate: string;
    total: number;
}

type trendChartType = {
    id: string;
    examDate: string;
    total: number;
    listening: number;
    reading: number;
}

export const formatChartData = (scores: scoreType[]): chartType[] => {
    const chartData = scores.map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.totalScore
    }));
    return chartData;
}

export const formatTrendChartData = (scores: scoreType[]): trendChartType[] => {
    const chartData = scores.map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.totalScore,
        listening: d.listeningScore,
        reading: d.readingScore
    }));
    return chartData;
}