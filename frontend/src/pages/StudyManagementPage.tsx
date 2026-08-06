import { Header } from "../components/Header"
import { StudyTable } from "../components/studySession/StudyTable";
import { StudyTimeSummary } from "../components/studySession/StudyTimeSummary";
import { CategoryBreakdown } from "../components/studySession/CategoryBreakdown";
import { useStudySession } from "../hooks/study_session/useStudySession";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export const StudyManagementPage = () => {
    const { data, isLoading, isError } = useStudySession();

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
                <ErrorPage onRetry={() => {
                    useStudySession().refetch();
                }} />
            </div>
        )
    }
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <StudyTimeSummary studySessions={data} />
                    <CategoryBreakdown studySessions={data} />
                </div>
                <StudyTable studySessions={data} />
            </main>

        </div>
    );
};