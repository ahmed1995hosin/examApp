"use client";

import { PieChart, Pie, Cell, Label } from "recharts";

type TimerProps = {
  value: number;
  total: number;
};

export default function TimerDonut({ value, total }: TimerProps) {
  const percent = Math.min((value / total) * 100, 100);

  const data = [
    { name: "done", value: percent },
    { name: "rest", value: 100 - percent },
  ];

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-[64px] h-[64px] flex items-center justify-center">
      <PieChart width={66} height={66}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={23}
          outerRadius={30}
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          <Cell fill="#2563eb" /> {/* blue-600 */}
          <Cell fill="#dbeafe" /> {/* blue-100 */}
          <Label
            position="center"
            content={() => (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-blue-600 text-[12px] font-semibold"
              >
                {formatTime(value)}
              </text>
            )}
          />
        </Pie>
      </PieChart>
    </div>
  );
}
