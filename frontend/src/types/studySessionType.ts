
export type studySessionType = {
    id: number;
    date: string;
    category: categoryType;
    duration: number;
    memo: string;
}

export type categoryType = "GRAMMAR" | "VOCABULARY" | "LISTENING" | "MOCK_EXAM";