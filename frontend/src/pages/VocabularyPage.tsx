import { Header } from "../components/Header"
import { VocabularySummary } from "../components/vocabulary/VocabularySummary"
import { VocabularyTable } from "../components/vocabulary/VocabularyTable"
import { VocabularyTest } from "../components/vocabulary/VocabularyTest"
import { useGetVocabulary } from "../hooks/vocabulary/useGetVocabulary"
import { ErrorPage } from "./ErrorPage"
import { LoadingPage } from "./LoadingPage"

export const VocabularyPage = () => {
    const { data, isLoading, isError, refetch } = useGetVocabulary();
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
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <VocabularySummary vocabularies={data} />
                    <VocabularyTest vocabularies={data} />
                </div>
                <VocabularyTable vocabularies={data} />
            </main>
        </div>
    )
}