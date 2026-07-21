import type { periodType } from "../types/periodType";
import type { tableType } from "../types/studySessionType";


export const changeTableByPeriod = (period: periodType, filteredStudyTables: tableType[]): tableType[] => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();
    let chooseTables: tableType[] = []
    if (period === "all") {
        chooseTables = filteredStudyTables;
    }
    else if (period === "thisMonth") {
        chooseTables = filteredStudyTables.filter((studyTable) => {
            const month = new Date(studyTable.date).getMonth() + 1;
            const year = new Date(studyTable.date).getFullYear();
            return (year === thisYear) && (month === thisMonth);
        })
    }
    else if (period === "lastMonth") {
        chooseTables = filteredStudyTables.filter((studyTable) => {
            const month = new Date(studyTable.date).getMonth() + 1;
            const year = new Date(studyTable.date).getFullYear();
            if (thisMonth === 1) {
                return (year === thisYear - 1) && (month === 12);
            }
            return month === thisMonth - 1;
        })
    }
    else if (period === "lastThreeMonth") {
        chooseTables = filteredStudyTables.filter((studyTable) => {
            const month = new Date(studyTable.date).getMonth() + 1;
            const year = new Date(studyTable.date).getFullYear();
            if (thisMonth === 1) {
                return (year === thisYear - 1 && month === 12) ||
                    (year === thisYear - 1 && month === 11) ||
                    (year === thisYear && month === 1);
            }
            else if (thisMonth === 2) {
                return (year === thisYear - 1 && month === 12) ||
                    (year === thisYear && month === 1) ||
                    (year === thisYear && month === 2);
            }
            return (year === thisYear) && (thisMonth - 2 <= month) && (month <= thisMonth);
        })
    }
    return chooseTables;
}