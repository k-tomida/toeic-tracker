export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
    targetScore: number;
    nextExamDate: string | null;
};