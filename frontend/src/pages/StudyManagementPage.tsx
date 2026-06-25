import { Header } from "../components/Header"
import { AddSessionButton } from "../components/studySession/AddSessionButton";
import { CiFilter } from "react-icons/ci";
import { StudyTable } from "../components/studySession/StudyTable";
import { useState } from "react";
import { Select } from "../ui/Select";
import { PopUp } from "../modules/PopUp";
import type { tableType } from "../types/tableType";
import { StudyTimeSummary } from "../components/studySession/StudyTimeSummary";

type categoryType = {
    label: string;
    value: string;
}

const categoryOptions: categoryType[] = [
    { label: "すべてのカテゴリ", value: "all" },
    { label: "リスニング", value: "listening" },
    { label: "単語", value: "vocabulary" },
    { label: "文法", value: "grammar" },
    { label: "模試", value: "full" },
];

const periodOptions: categoryType[] = [
    { label: "期間 : すべて", value: "all" },
    { label: "今月", value: "thisMonth" },
    { label: "先月", value: "lastMonth" },
    { label: "過去3ヶ月", value: "lastThreeMonth" }
];

const orderOptions: categoryType[] = [
    { label: "並び順 : 新しい順", value: "newest" },
    { label: "古い順", value: "oldest" },
    { label: "学習時間が長い順", value: "longest" },
];

export const StudyManagementPage = () => {
    const [category, setCategory] = useState(categoryOptions[0].value);
    const [period, setPeriod] = useState(periodOptions[0].value);
    const [order, setOrder] = useState(orderOptions[0].value);
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
                <StudyTimeSummary />
                <div className="flex items-center justify-between">
                    <div className="flex justify-center gap-5 bg-emerald-50 border border-emerald-200 p-3 m-4 rounded-lg items-center flex-wrap">
                        <CiFilter size={28} />
                        <Select name="category" value={category} onChange={setCategory} options={categoryOptions} />
                        <Select name="period" value={period} onChange={setPeriod} options={periodOptions} />
                        <Select name="order" value={order} onChange={setOrder} options={orderOptions} />
                    </div>
                    <AddSessionButton onClick={() => openPopUp(null)} />
                </div>
                <div className="m-6">
                    <StudyTable
                        category={category}
                        period={period}
                        order={order}
                        onEdit={(data) => openPopUp(data)}
                    />
                </div>
            </main>
            {isPopUpOpen && (
                <PopUp
                    onClose={() => setIsPopUpOpen(false)}
                    data={popUpData}
                />
            )}
        </div>
    );
};