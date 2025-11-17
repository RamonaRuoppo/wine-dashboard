import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

function Chart({ data = [], lines = [], xKey = "time", dataKey = "value", label, color , height}) {

    return (
        <div className="bg-white dark:border-gray-700 dark:bg-gray-800 p-4 rounded-xl shadow w-full h-full">
            <h3 className="text-2sm text-gray-600 dark:text-gray-300 mb-2">
                Andamento {label}
            </h3>

            <ResponsiveContainer width="100%" height={height}>
                <LineChart
                    margin={{ top: 20, right: 30, left: -10, bottom: 20 }}
                    data={data}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
                    <XAxis
                        dataKey={xKey}
                        tick={{ fontSize: 10 }}
                    />
                    <YAxis
                        tick={{ fontSize: 10 }}

                    />
                    <Tooltip />
                    <Legend />

                    {lines.map((line, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey={line.key}
                            stroke={line.color}
                            strokeWidth={2}
                            dot={false}
                            name={line.name}
                            activeDot={{ r: 4 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;