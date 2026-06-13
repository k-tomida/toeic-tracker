import { Chart } from "../../modules/Chart";

export const ScoreChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-300 max-w-[550px]">
      <p className="mb-3 text-xl font-medium text-gray-600">スコア推移</p>
      <Chart />
    </div>
  );
};
