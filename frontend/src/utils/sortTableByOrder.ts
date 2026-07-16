import type { orderType } from "../types/orderType";
import type { scoreType } from "../types/scoreType";
import type { tableType } from "../types/tableType";
import type { vocabularyOrderType, vocabularyType } from "../types/vocabularyType";


export const sortTableByOrder = (order: orderType, filteredStudyTables: tableType[]): tableType[] => {
    if (order === "newest") {
        return [...filteredStudyTables].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }
    if (order === "oldest") {
        return [...filteredStudyTables].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    if (order === "longest") {
        return [...filteredStudyTables].sort((a, b) => b.duration - a.duration);
    }
    return filteredStudyTables;
}

export const sortScoreByNewest = (scoreData: scoreType[]): scoreType[] => {

    return [...scoreData].sort((a, b) => Date.parse(b.examDate) - Date.parse(a.examDate));
}

export const sortVocabularyByOrder = (order: vocabularyOrderType, filteredStudyTables: vocabularyType[]): vocabularyType[] => {
    if (order === "newest") {
        return [...filteredStudyTables].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }
    if (order === "oldest") {
        return [...filteredStudyTables].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    if (order === "alphabetical") {
        return [...filteredStudyTables].sort((a, b) => a.word.localeCompare(b.word));
    }
    return filteredStudyTables;
}