import { KpiCard } from "../../modules/KpiCard"
import { countAcquiredVocabulary, countUnacquiredVocabulary, countVocabulary } from "../../utils/calcVocabulary"

export const VocabularySummary = () => {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600"> 語彙サマリー</h2>
            <div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title="総単語数" value={countVocabulary()} />
                    <KpiCard title="習得率" value={countVocabulary() === 0 ? 0 : Math.round(countAcquiredVocabulary() / countVocabulary() * 100)} unit="%" />
                </div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title="習得済み" value={countAcquiredVocabulary()} />
                    <KpiCard title="未習得" value={countUnacquiredVocabulary()} />
                </div>
            </div>
        </div>
    )
}