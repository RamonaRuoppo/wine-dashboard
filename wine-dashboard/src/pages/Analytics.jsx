import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from "recharts";
import { generateVineyardData } from "../data/simulator";
import { ChartBar, ChevronDown } from "lucide-react";

const data = generateVineyardData(30);

function Analytics() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Analytics</h2>
      <p className="text-gray-500 mb-6">Qui è possibile visualizzare diversi dati e insights riguarto il tuo vigneto.</p>
      {/* Filtri */}
            <div className="flex items-center gap-3 mb-6 mt-6">
                <ChartBar className="w-6 h-6 text-[#722F37]"></ChartBar>
                <h2 className="text-lg font-semibold text-gray-700">Efficienza del Raccolto</h2>
            </div>
            <h3 className="font-semibold mb-4 text-gray-700">Filtri</h3>
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Anno di Vendemmia */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anno di Vendemmia
                    </label>
                    <div className="relative w-full">
                        <select
                            defaultValue="2025"
                            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"
                        >
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Comparazione */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comparazione
                    </label>
                    <div className="relative w-full">
                        <select
                            defaultValue="prev"
                            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"
                        >
                            <option value="prev">Anno Precedente (2024)</option>
                            <option value="avg5">Media Storica 5 Anni</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Vigneto */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vigneto
                    </label>
                    <div className="relative w-full">
                        <select
                            defaultValue="all"
                            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"
                        >
                            <option value="all">Tutti</option>
                            <option value="sangiovese">Sangiovese</option>
                            <option value="merlot">Merlot</option>
                            <option value="trebbiano">Trebbiano</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

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