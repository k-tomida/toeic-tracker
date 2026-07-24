import { KpiCard } from "../../modules/KpiCard"
import type { vocabularyType } from "../../types/vocabularyType"
import { countVocabulary, countVocabularyByStatus } from "../../utils/calcVocabulary"

export const VocabularySummary = ({ vocabularies }: { vocabularies: vocabularyType[] }) => {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600"> 語彙サマリー</h2>
            <div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title="総単語数" value={countVocabulary(vocabularies)} />
                    <KpiCard title="習得率" value={countVocabulary(vocabularies) === 0 ? 0 : Math.round(countVocabularyByStatus(vocabularies, "ACQUIRED") / countVocabulary(vocabularies) * 100)} unit="%" />
                </div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title="習得済み" value={countVocabularyByStatus(vocabularies, "ACQUIRED")} />
                    <KpiCard title="未習得" value={countVocabularyByStatus(vocabularies, "UNACQUIRED")} />
                </div>
            </div>
        </div>
    )
}