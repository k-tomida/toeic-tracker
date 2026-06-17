
const datas = [
    { date: "2026-06-16", category: ["リスニング", "単語"], studyTime: 45 },
    { date: "2026-06-15", category: ["単語"], studyTime: 30 },
    { date: "2026-06-14", category: ["リーディング"], studyTime: 60 },
    { date: "2026-06-13", category: ["単語"], studyTime: 20 },
    { date: "2026-06-12", category: ["リスニング"], studyTime: 50 }
];

//カテゴリ別にcssを変える関数
const changeTagByCategory = (category: string) => {
    return (
        <div>
            {category}
        </div>

    )
}

//dateを2026-06-16から6/16(月)に変える関数
const formatDateLabel = (date: string) => {
    return "";
}

export const StudySession = () => {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0 min-w-[400px]">
            {datas.map((data) => (
                <div key={data.date} className="flex justify-between">
                    <div>{data.date}</div>
                    <div>{data.category.map((category) => (
                        changeTagByCategory(category)
                    ))}</div>
                    <div>{data.studyTime}min</div>
                </div>
            ))}
        </div>
    )
}