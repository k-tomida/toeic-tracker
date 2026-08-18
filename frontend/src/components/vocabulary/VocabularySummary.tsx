import { KpiCard } from "../../modules/KpiCard"
import type { vocabularyType } from "../../types/vocabularyType"
import { countVocabulary, countVocabularyByStatus } from "../../utils/calcVocabulary"

export const VocabularySummary = ({ vocabularies }: { vocabularies: vocabularyType[] }) => {
    return (
        <div className="w-full bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0">
            <h2 className="mb-3 text-xl font-medium text-gray-600">語彙サマリー</h2>
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 xl:gap-4">
                    <KpiCard title="総単語数" value={countVocabulary(vocabularies)} />
                    <KpiCard title="習得率" value={countVocabulary(vocabularies) === 0 ? 0 : Math.round(countVocabularyByStatus(vocabularies, "ACQUIRED") / countVocabulary(vocabularies) * 100)} unit="%" />
                </div>
                <div className="grid grid-cols-2 gap-3 xl:gap-4">
                    <KpiCard title="習得済み" value={countVocabularyByStatus(vocabularies, "ACQUIRED")} />
                    <KpiCard title="未習得" value={countVocabularyByStatus(vocabularies, "UNACQUIRED")} />
                </div>
            </div>
        </div>
    )
}