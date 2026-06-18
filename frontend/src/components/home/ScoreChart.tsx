import { Chart } from "../../modules/Chart";

export const ScoreChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0 min-w-[400px]">
      <p className="mb-3 text-xl font-medium text-gray-600">スコア推移</p>
      <Chart />
    </div>
  );
};
