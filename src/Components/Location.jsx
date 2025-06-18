import { color } from "motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Location({ stats }) {
  //* Counting how many times each city appears in the stats array.
  const cityCounts = stats.reduce((acc, curr) => {
    const city = curr.city?.toLowerCase();

    if (!acc[city]) {
      acc[city] = 1;
    } else acc[city]++;

    return acc;
  }, {});

  console.log(cityCounts);

  //* converts the cityCounts object into an array of [key, value] pairs
  const cities = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={cities}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
