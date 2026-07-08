import { dummyScoreData } from "../data/dummyScoreData";
import { formatDateSlashAndRemoveDay } from "./formatDate";

type chartType = {
    id: string;
    examDate: string;
    total: number;
}

export const formatChartData = (): chartType[] => {
    const chartData = dummyScoreData.map((d) => ({
        id: d.id,
        examDate: formatDateSlashAndRemoveDay(d.examDate),
        total: d.listening + d.reading,
    }));
    return chartData;
}