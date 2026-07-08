import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { formatChartData } from "../../utils/formatChartData";

export const ScoreChart = () => {
  const chartData = formatChartData();
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0 min-w-[400px]">
      <p className="mb-3 text-xl font-medium text-gray-600">スコア推移</p>
      <div className="overflow-x-auto">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          barGap={8}
          barCategoryGap="20%"
        >
          <Bar
            dataKey="total"
            name="total"
            fill="rgb(34 197 94)"
            radius={[10, 10, 0, 0]}
          >
            <LabelList
              dataKey="total"
              position="top"
              className="fill-gray-600 text-xs"
            />
          </Bar>
          <XAxis dataKey="examDate" />
        </BarChart>
      </div>
    </div>
  );
};
