import { Header } from "../components/Header"
import { VocabularySummary } from "../components/vocabulary/VocabularySummary"
import { VocabularyTest } from "../components/vocabulary/VocabularyTest"

export const VocabularyPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <VocabularySummary />
                    <VocabularyTest />
                </div>
            </main>
        </div>
    )
}