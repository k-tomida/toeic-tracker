import { useState } from "react"
import { ProgressBar } from "../../ui/ProgressBar"
import { dummyUser } from "../../data/dummyUser";
import { calcBestScore } from "../../utils/calcScore";

export const GoalSetting = () => {
    const [date, setDate] = useState(dummyUser.nextExamDate);
    const [score, setScore] = useState(dummyUser.targetScore);
    const [bestScore] = calcBestScore();
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600">目標設定</h2>
            <div className="m-2">
                <p>目標スコア</p>
                <p className="py-3">
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(parseInt(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-20"
                    />
                    点
                </p>
                <ProgressBar current={bestScore} target={score} barHeight="h-3" />
                <div>
                    <span>{bestScore}点</span>
                    <span>残り{score - bestScore}点 ({Math.round((bestScore / score) * 100)}%)</span>
                </div>
            </div>
            <div className="m-2">
                <p>次回受験予定日</p>
                <input
                    type="date"
                    value={date ?? new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                />
            </div>
            <button>更新</button>
        </div>
    )
}