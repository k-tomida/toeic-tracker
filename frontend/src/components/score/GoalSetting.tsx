import { useState } from "react";
import { ProgressBar } from "../../ui/ProgressBar";
import { calcBestScore } from "../../utils/calcScore";
import { useUserMutation } from "../../hooks/user/useUser";
import type { userType } from "../../types/userType";

export const GoalSetting = ({ user }: { user: userType }) => {
    const mutation = useUserMutation();
    const [date, setDate] = useState(user.nextExamDate ?? new Date().toISOString().slice(0, 10));
    const [score, setScore] = useState(user.targetScore ?? 600);

    const [bestScore] = calcBestScore();
    const isAchieved = bestScore >= score;

    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600">目標設定</h2>
            <div className="m-2">
                <p className="text-lg text-gray-500">目標スコア</p>
                <p className="py-3">
                    <input
                        type="number"
                        value={score}
                        max={990}
                        min={0}
                        onChange={(e) => setScore(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-20"
                    />
                    点
                </p>
                <ProgressBar current={bestScore} target={score} barHeight="h-3" />
                <div className="flex justify-between p-1 text-sm text-gray-600">
                    <span>{bestScore}点</span>
                    {isAchieved ? (
                        <span className="text-green-600 font-medium">目標達成 🎉</span>
                    ) : (
                        <span>残り{score - bestScore}点 ({Math.round((bestScore / score) * 100)}%)</span>
                    )}
                </div>
            </div>
            <div className="m-2">
                <p className="text-lg text-gray-500">次回受験予定日</p>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                />
            </div>
            <div className="flex justify-center pt-3">
                <button
                    className="bg-green-500 rounded-lg p-3 text-white w-[400px] hover:bg-green-600 active:bg-green-700"
                    onClick={() => mutation.mutate({
                        targetScore: score,
                        nextExamDate: date
                    })}>更新</button>
            </div>
        </div>
    );
};