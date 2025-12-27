"use client"

import { Pie, PieChart } from "recharts"

type Props = {
  correct: number
  incorrect: number
}

export default function ChartResult({ correct, incorrect }: Props) {
  const data = [
    { name: "Correct", value: correct, fill: "#00BC7D" },
    { name: "Incorrect", value: incorrect, fill: "#EF4444" },
  ]

  return (
    <div className="w-[203px] h-[203px] flex flex-col items-center justify-center">
      <PieChart width={203} height={203}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={55}
          outerRadius={90}
          startAngle={20}
          endAngle={380}
          isAnimationActive={false}
        />
      </PieChart>

      <div className="flex flex-col gap-2.5 mt-6 text-sm font-medium text-black">
        <div className="flex items-center gap-2.5">
          <span className="w-4 h-4 bg-emerald-500 " />
          Correct: {correct}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-4 h-4 bg-red-500 " />
          Incorrect: {incorrect}
        </div>
      </div>
    </div>
  )
}
