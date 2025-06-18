import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function DeviceStats({ stats }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const deviceCount = stats.reduce((acc, curr) => {
    if (!acc[curr.device]) {
      acc[curr.device] = 0;
    }
    acc[curr.device]++;
    return acc;
  }, {});

  // Converting deviceCount object to an array
  const result = Object.entries(deviceCount).map(([device, count]) => ({
    name: device, // Changed from 'device' to 'name' for Legend compatibility
    value: count, // Changed from 'count' to 'value' for better semantics
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={result}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) =>
              `${value}: ${entry.payload.value} (${(
                (entry.payload.value / stats.length) *
                100
              ).toFixed(0)}%)`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
