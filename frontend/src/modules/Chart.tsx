import { Bar, BarChart, XAxis, LabelList, Legend } from "recharts";

const data = [
  { examDay: "2026-06", listeningScore: 200, readingScore: 220 },
  { examDay: "2026-07", listeningScore: 230, readingScore: 245 },
  { examDay: "2026-08", listeningScore: 300, readingScore: 250 },
  { examDay: "2026-09", listeningScore: 445, readingScore: 375 },
  { examDay: "2026-10", listeningScore: 495, readingScore: 495 },
  { examDay: "2026-11", listeningScore: 495, readingScore: 495 },
  { examDay: "2026-12", listeningScore: 495, readingScore: 495 },
  { examDay: "2026-13", listeningScore: 495, readingScore: 495 },
  { examDay: "2026-14", listeningScore: 495, readingScore: 495 },
  { examDay: "2026-15", listeningScore: 495, readingScore: 495 },
];

export const Chart = () => {
  return (
    <div className="overflow-x-auto">
      <BarChart
        width={1000}
        height={300}
        data={data}
        barGap={8}
        barCategoryGap="20%"
      >
        <Bar
          dataKey="listeningScore"
          name="リスニング"
          fill="#0284c7"
          radius={[10, 10, 0, 0]}
        >
          <LabelList
            dataKey="listeningScore"
            position="top"
            className="fill-gray-600 text-xs"
          />
        </Bar>
        <Bar
          dataKey="readingScore"
          name="リーディング"
          fill="#7c3aed"
          radius={[10, 10, 0, 0]}
        >
          <LabelList
            dataKey="readingScore"
            position="top"
            className="fill-gray-600 text-xs"
          />
        </Bar>
        <XAxis dataKey="examDay" />
        <Legend
          verticalAlign="bottom"
          align="left"
          height={36}
          iconType="circle"
          iconSize={10}
        />
      </BarChart>
    </div>
  );
};
