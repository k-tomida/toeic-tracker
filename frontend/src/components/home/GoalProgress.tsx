import { ProgressBar } from "../../ui/ProgressBar"
import { calcBestScore } from "../../utils/calcScore"

type Props = {
    targetScore: number;
}

export const GoalProgress = ({ targetScore }: Props) => {
    const [total, listening, reading] = calcBestScore()
    const isAchieved = total >= targetScore;
    return (
        <div className="bg-white rounded-xl p-4 m-10 border border-gray-300">
            <p className="mb-3 text-xl font-medium text-gray-600">目標スコア達成率</p>
            <div className="flex justify-between items-end">
                <span className="ml-4 text-5xl">{total} <span className="text-xl text-gray-500">/ {targetScore}</span></span>
                {isAchieved ?
                    (<span className="mr-4 text-gray-500 text-xl">目標達成 🎉</span>) :
                    (<span className="mr-4 text-gray-500">あと<span className="text-xl text-black">{targetScore - total}点</span></span>)}
            </div>
            <div className="m-4">
                <ProgressBar current={total} target={targetScore} barHeight="h-5" />
                <div className="flex justify-between mt-2">
                    <span className="text-gray-500">0</span>
                    {isAchieved ?
                        (<span className="text-2xl">100%</span>) :
                        (<span className="text-2xl">{Math.round((total / targetScore) * 100)}%</span>)}
                    <span className="text-gray-500">{targetScore}</span>
                </div>
            </div>

            <div className="flex justify-between gap-10 mx-5 flex-wrap">

                <div className="flex-1 min-w-[280px]">
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

                <div className="flex-1 min-w-[280px]">
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