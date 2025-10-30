import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from "recharts";
import { generateVineyardData } from "../data/simulator";

const data = generateVineyardData(30);

function Analytics() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Analytics</h2>
      <p className="text-gray-500 mb-6">Qui è possibile visualizzare diversi dati e insights riguarto il tuo vigneto.</p>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        <Line type="monotone" dataKey="rainfall" stroke="#ffc658" />
        <Line type="monotone" dataKey="sunlightHours" stroke="#ff7300" />
      </LineChart>
    </div>
  );
}

export default Analytics;