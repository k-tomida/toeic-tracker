import { changeTagByCategory } from "../../utils/changeTagByCategory";
import { formatDate } from "../../utils/formatDate";



const dummyStudySessions = [
    {
        id: "1",
        date: "2026-06-16",
        category: ["模試", "リスニング", "単語", "文法"],
        duration: 120,
        score: 820,
        memo: "公式問題集Vol.3",
    },
    {
        id: "2",
        date: "2026-06-15",
        category: ["単語"],
        duration: 30,
        memo: "アプリで100問",
    },
    {
        id: "3",
        date: "2026-06-14",
        category: ["文法"],
        duration: 60,
        memo: "Part5対策",
    },
    {
        id: "4",
        date: "2026-06-13",
        category: ["リスニング"],
        duration: 45,
        memo: "Part2集中練習",
    },
    {
        id: "5",
        date: "2026-06-12",
        category: ["単語"],
        duration: 50,
        memo: "アプリで150問",
    },
    {
        id: "6",
        date: "2026-06-10",
        category: ["模試"],
        duration: 120,
        score: 780,
        memo: "公式問題集Vol.2",
    },
    {
        id: "7",
        date: "2026-06-08",
        category: ["文法"],
        duration: 20,
        memo: "Part6対策",
    },
    {
        id: "8",
        date: "2026-06-06",
        category: ["リスニング"],
        duration: 40,
        memo: "Part3,4ディクテーション",
    },
    {
        id: "9",
        date: "2026-06-04",
        category: ["単語"],
        duration: 35,
        memo: "単語帳2周目",
    },
    {
        id: "10",
        date: "2026-06-02",
        category: ["文法"],
        duration: 55,
        memo: "Part5,6まとめ",
    },
];

export const StudyTable = () => {
    return (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden border-separate border-spacing-0">
            <thead>
                <tr className="text-left text-sm text-gray-500 ">
                    <th className="py-3 px-3">日付</th>
                    <th className="py-3 px-3">カテゴリ</th>
                    <th className="py-3 px-3">学習時間</th>
                    <th className="py-3 px-3">メモ</th>
                    <th className="py-3 px-3"></th>
                </tr>
            </thead>
            <tbody>
                {dummyStudySessions.map((data) => (
                    <tr key={data.id} className="hover:bg-stone-100">
                        <td className="py-3 px-3">{formatDate(data.date)}</td>
                        <td className="py-3 px-3">{data.category.map(category => changeTagByCategory(category))}</td>
                        <td className="py-3 px-3">{data.duration}min</td>
                        <td className="py-3 px-3">{data.memo}</td>
                        <td className="py-3 px-3">
                            <button className="cursor-pointer">aaa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}