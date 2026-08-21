import type { scoreType } from "../../types/scoreType";
import { ProgressBar } from "../../ui/ProgressBar"
import { calcBestScore } from "../../utils/calcScore"

type Props = {
    targetScore: number | null;
    scores: scoreType[]
}

export const GoalProgress = ({ targetScore, scores }: Props) => {
    const [total, listening, reading] = calcBestScore(scores)
    const isAchieved = targetScore !== null && total >= targetScore;
    return (
        <div className="w-full bg-white rounded-xl p-4 border border-gray-300">
            <p className="mb-3 text-xl font-medium text-gray-600">目標スコア達成率</p>
            {targetScore === null ? (
                <div className="py-6 text-center text-gray-500 text-xl">
                    目標スコアが未設定です
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-end">
                        <span className="text-4xl sm:ml-4 sm:text-5xl">
                            {total}
                            <span className="text-gray-500 text-xl sm:mr-4">
                                {" "}/ {targetScore}
                            </span>
                        </span>

                        {isAchieved ? (
                            <span className="mr-4 text-gray-500 text-xl">
                                目標達成 🎉
                            </span>
                        ) : (
                            <span className="mr-4 text-gray-500">
                                あと
                                <span className="text-xl text-black">
                                    {targetScore - total}点
                                </span>
                            </span>
                        )}
                    </div>

                    <div className="mx-0 mt-4 sm:m-4">
                        <ProgressBar
                            current={total}
                            target={targetScore}
                            barHeight="h-5"
                        />

                        <div className="flex justify-between mt-2">
                            <span className="text-gray-500">0</span>

                            {isAchieved ? (
                                <span className="text-2xl">100%</span>
                            ) : (
                                <span className="text-2xl">
                                    {Math.round(
                                        (total / targetScore) * 100
                                    )}
                                    %
                                </span>
                            )}

                            <span className="text-gray-500">
                                {targetScore}
                            </span>
                        </div>
                    </div>
                </>
            )}

            <div className="grid grid-cols-1 gap-6 mx-0 lg:grid-cols-2 lg:gap-10 lg:mx-5">

                <div className="w-full min-w-0">
                    <div className="flex justify-between items-center text-lg">
                        <div className="m-2 flex items-center gap-2">
                            <div className="h-3 w-3 bg-sky-600 rounded-full"></div>
                            <span>リスニング</span>
                        </div>
                        <div>
                            <span>{listening} / 495</span>
                        </div>
                    </div>
                    <ProgressBar current={listening} target={495} barHeight="h-3" color="bg-sky-600" />
                    <div className="flex justify-between mt-2 text-gray-500">
                        <span>0</span>
                        <span>495</span>
                    </div>
                </div>

                <div className="w-full min-w-0">
                    <div className="flex justify-between items-center text-lg">
                        <div className="m-2 flex items-center gap-2">
                            <div className="h-3 w-3 bg-violet-600 rounded-full"></div>
                            <span className="text-lg">リーディング</span>
                        </div>
                        <div>
                            <span>{reading} / 495</span>
                        </div>
                    </div>
                    <ProgressBar current={reading} target={495} barHeight="h-3" color="bg-violet-600" />
                    <div className="flex justify-between mt-2 text-gray-500">
                        <span>0</span>
                        <span>495</span>
                    </div>
                </div>

            </div>
        </div>
    )
}