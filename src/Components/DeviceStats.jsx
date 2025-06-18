import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DeviceStats({ stats }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const deviceCount = stats.reduce((acc, curr) => {
    if (!acc[curr.device]) {
      acc[curr.device] = 0;
    }
    acc[curr.device]++;

    return acc;
  }, {});

  //* Converting deviceCount object to an array
  const result = Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            dataKey="count"
            labelLine={false}
            label={({ device, percent }) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
