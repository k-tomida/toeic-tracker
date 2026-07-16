import { Header } from "../components/Header"
import { AddSessionButton } from "../components/studySession/AddSessionButton";
import { CiFilter } from "react-icons/ci";
import { StudyTable } from "../components/studySession/StudyTable";
import { useState } from "react";
import { Select } from "../ui/Select";
import { StudyPopUp } from "../modules/StudyPopUp";
import type { tableType } from "../types/tableType";
import { StudyTimeSummary } from "../components/studySession/StudyTimeSummary";
import type { orderType } from "../types/orderType";
import type { categoryType } from "../types/categoryType";
import type { periodType } from "../types/periodType";
import { CategoryBreakdown } from "../components/studySession/CategoryBreakdown";

const categoryOptions: { label: string, value: categoryType }[] = [
    { label: "すべてのカテゴリ", value: "all" },
    { label: "リスニング", value: "listening" },
    { label: "単語", value: "vocabulary" },
    { label: "文法", value: "grammar" },
    { label: "模試", value: "mockExam" },
];

const periodOptions: { label: string, value: periodType }[] = [
    { label: "期間 : すべて", value: "all" },
    { label: "今月", value: "thisMonth" },
    { label: "先月", value: "lastMonth" },
    { label: "過去3ヶ月", value: "lastThreeMonth" }
];

const orderOptions: { label: string, value: orderType }[] = [
    { label: "並び順 : 新しい順", value: "newest" },
    { label: "古い順", value: "oldest" },
    { label: "学習時間が長い順", value: "longest" },
];

export const StudyManagementPage = () => {
    const [category, setCategory] = useState<categoryType>(categoryOptions[0].value);
    const [period, setPeriod] = useState<periodType>(periodOptions[0].value);
    const [order, setOrder] = useState<orderType>(orderOptions[0].value);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState<tableType | null>(null);

    const openPopUp = (data: tableType | null) => {
        setPopUpData(data);
        setIsPopUpOpen(true);
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <StudyTimeSummary />
                    <CategoryBreakdown />
                </div>
                <StudyTable />
            </main>
            {isPopUpOpen && (
                <StudyPopUp
                    onClose={() => setIsPopUpOpen(false)}
                    data={popUpData}
                />
            )}
        </div>
    );
};