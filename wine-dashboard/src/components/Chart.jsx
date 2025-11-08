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

function Chart({ data = [], dataKey = "value", label, color }) {

    return (
        <div className="bg-white p-4 rounded-lg shadow w-full h-full">
            <h3 className="text-2sm text-gray-600 mb-2">
                Andamento {label} Giornaliero (%)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                    <XAxis
                      dataKey="hour"
                      type="category"
                      interval={1}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;