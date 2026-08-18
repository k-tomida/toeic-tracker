import { Header } from "../components/Header"
import { StudyTable } from "../components/studySession/StudyTable";
import { StudyTimeSummary } from "../components/studySession/StudyTimeSummary";
import { CategoryBreakdown } from "../components/studySession/CategoryBreakdown";
import { useGetStudySession } from "../hooks/study_session/useGetStudySession";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export const StudyManagementPage = () => {
    const { data, isLoading, isError, refetch } = useGetStudySession();

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <Header />
                <LoadingPage />
            </div>
        )
    };

    if (isError || !data) {
        return (
            <div className="min-h-screen">
                <Header />
                <ErrorPage onRetry={() => refetch()} />
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <StudyTimeSummary studySessions={data} />
                        <CategoryBreakdown studySessions={data} />
                    </div>
                    <StudyTable studySessions={data} />
                </div>
            </main>
        </div>
    );
};