import { dummyScoreData } from "../data/dummyScoreData";
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

export const formatChartData = (): chartType[] => {
    const chartData = dummyScoreData.map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.listening + d.reading,
    }));
    return chartData;
}

export const formatTrendChartData = (): trendChartType[] => {
    const chartData = dummyScoreData.map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.listening + d.reading,
        listening: d.listening,
        reading: d.reading
    }));
    return chartData;
}