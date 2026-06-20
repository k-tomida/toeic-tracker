import { Header } from "../components/Header"
import { AddSessionButton } from "../components/studySession/AddSessionButton";
import { CategorySelect } from "../components/studySession/CategorySelect"
import { OrderSelect } from "../components/studySession/OrderSelect"
import { PeriodSelect } from "../components/studySession/PeriodSelect"

import { CiFilter } from "react-icons/ci";

export const StudyManagementPage = () => {
    return (
        <div className="min-h-screen ">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex justify-between">
                    <h1 className="text-xl ml-6">学習記録</h1>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex justify-center gap-5 bg-stone-200 p-3 m-4 rounded-lg items-center flex-wrap">
                        <CiFilter size={28} />
                        <CategorySelect />
                        <PeriodSelect />
                        <OrderSelect />
                    </div>
                    <AddSessionButton />
                </div>
            </main>
        </div>
    )
}