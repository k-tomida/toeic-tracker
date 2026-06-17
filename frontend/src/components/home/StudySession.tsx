
const datas = [
    { date: "2026-06-16", category: ["リスニング", "単語", "リーディング", "文法", "模試"], studyTime: 45 },
    { date: "2026-06-15", category: ["単語"], studyTime: 30 },
    { date: "2026-06-14", category: ["リーディング"], studyTime: 60 },
    { date: "2026-06-13", category: ["単語"], studyTime: 20 },
    { date: "2026-06-12", category: ["リスニング"], studyTime: 50 }
];

const tagStyles: Record<string, string> = {
    リスニング: "bg-blue-50 text-blue-800",
    リーディング: "bg-purple-50 text-purple-800",
    単語: "bg-amber-50 text-amber-800",
    文法: "bg-green-50 text-green-800",
    模試: "bg-orange-50 text-orange-800",
};

//カテゴリ別にタグの色を変える関数
const changeTagByCategory = (category: string) => (
    <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${tagStyles[category] ?? "bg-gray-100 text-gray-700"}`}>
        {category}
    </span>
);

//dateを2026-06-16から6/16(月)に変える関数
const formatDateLabel = (date: string) => {
    return "";
}

export const StudySession = () => {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0 min-w-[550px]">
            <p className="mb-3 text-xl font-medium text-gray-600">直近の学習セッション</p>
            {datas.map((data) => (
                <div key={data.date} className="flex justify-between gap-3 py-3 border-b border-gray-200 last:border-b-0">
                    <div>{data.date}</div>
                    <div className="flex gap-1 flex-1">{data.category.map((category) => changeTagByCategory(category))}</div>
                    <div>{data.studyTime}min</div>
                </div>
            ))}
        </div>
    )
}