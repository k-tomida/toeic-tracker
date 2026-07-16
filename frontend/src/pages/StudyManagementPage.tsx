import { Header } from "../components/Header"
import { StudyTable } from "../components/studySession/StudyTable";
import { StudyTimeSummary } from "../components/studySession/StudyTimeSummary";
import { CategoryBreakdown } from "../components/studySession/CategoryBreakdown";

export const StudyManagementPage = () => {
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

        </div>
    );
};