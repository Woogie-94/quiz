import { PieChart, Pie, Cell, PieLabelRenderProps, ResponsiveContainer } from "recharts";
import { useResultPresenterContext } from "../presenter/Result.presenter";

const COLORS = ["#00c896", "#f56666"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }: Required<PieLabelRenderProps>) => {
  const radius = +outerRadius + 30;
  const x = +cx + radius * Math.cos(-midAngle * RADIAN);
  const y = +cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill={COLORS[index]} textAnchor={x > +cx ? "start" : "end"} dominantBaseline="central">
      {`${["정답", "오답"][index]} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Chart = () => {
  const { result } = useResultPresenterContext();

  const data = [
    { name: "정답", value: result?.correctCount },
    { name: "오답", value: result?.incorrectCount },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={100}
          startAngle={-270}
          label={renderCustomizedLabel}
          isAnimationActive={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: "none" }} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
