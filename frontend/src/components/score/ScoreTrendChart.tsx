import { Bar, ComposedChart, LabelList, Legend, Line, ReferenceLine, XAxis, YAxis } from "recharts"
import { formatTrendChartData } from "../../utils/formatChartData"
import type { scoreType } from "../../types/scoreType";

type Props = {
    targetScore: number;
    scores: scoreType[]
};

export const ScoreTrendChart = ({ targetScore, scores }: Props) => {
    const scoreData = formatTrendChartData(scores);
    return (
        <div className="bg-white rounded-xl p-4 m-10 border border-gray-300">
            <p className="mb-3 text-xl font-medium text-gray-600">スコア推移</p>
            <div className="overflow-x-auto ">
                <ComposedChart
                    width={1100}
                    height={400}
                    data={scoreData}
                    barGap={8}
                    barCategoryGap="20%"
                >
                    <Bar
                        dataKey="listening"
                        name="リスニング"
                        fill="#0284c7"
                        radius={[10, 10, 0, 0]}
                    >
                        <LabelList
                            dataKey="listening"
                            position="top"
                            className="fill-gray-600 text-xs"
                        />
                    </Bar>
                    <Bar
                        dataKey="reading"
                        name="リーディング"
                        fill="#7c3aed"
                        radius={[10, 10, 0, 0]}
                    >
                        <LabelList
                            dataKey="reading"
                            position="top"
                            className="fill-gray-600 text-xs"
                        />
                    </Bar>
                    <Line
                        dataKey="total"
                        name="合計"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    >
                        <LabelList
                            dataKey="total"
                            position="top"
                            className="fill-gray-600 text-lg"
                            offset={10}
                        />
                    </Line>
                    <ReferenceLine
                        y={targetScore}
                        stroke="#eda100"
                        strokeDasharray="4 4"
                        label={{ value: `目標 ${targetScore}`, position: "top", fill: "#c98500", fontSize: 14 }}
                    />
                    <XAxis dataKey="examDate" />
                    <YAxis domain={[0, 990]} />
                    <Legend
                        verticalAlign="bottom"
                        align="left"
                        height={36}
                        iconType="circle"
                        iconSize={10}
                    />
                </ComposedChart>
            </div>
        </div>
    )
}