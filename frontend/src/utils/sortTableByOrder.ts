import type { OrderType } from "../types/orderType";
import type { tableType } from "../types/tableType";


export const sortTableByOrder = (order: OrderType, filteredStudyTables: tableType[]): tableType[] => {
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