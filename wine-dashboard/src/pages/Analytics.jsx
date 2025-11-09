import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from "recharts";
import { generateVineyardData } from "../data/simulator";
import { AlertTriangle, ChartBar, ChevronDown, Circle, CloudRain, Droplet, Info, Sunrise } from "lucide-react";
import Card from "../components/card/Card";
import MetricCard from "../components/MetricCard";
import { useEffect, useState } from "react";
import { calculateDailyGDD, classifyWinkler } from "../utils/climateCalculations";
import RiskCard from "../components/RiskCard";

{/* 
    TODO:
        Grafici dettagliati (Temperatura, Umidità, Pioggia, Sole)
        Indici climatici (GDD, Huglin, Winkler)
        Eventi estremi (ondate di calore, gelate, piogge intense)
        Fattori di rischio
*/}

const data = generateVineyardData(30);

function Analytics() {
    const title = "Analytics";
    const [vineyardData, setVineyardData] = useState([]);
    const [climate, setClimate] = useState({ gdd: 0, winkler: "", gddPercentage: 0 });
    const [risk, setRisk] = useState(0);

    const latest = vineyardData[vineyardData.length - 1];

    const gddHistoric = 1720;

    const precipitationCurrent = 285; // mm
    const precipitationHistoric = 340; // mm
    const precipitationDiff = -16; // percentage

    const sunHoursCurrent = 1240;
    const sunHoursHistoric = 1150;
    const sunHoursDiff = +8; // percentage


    useEffect(() => {
        const data = generateVineyardData(30);
        setVineyardData(data);

        // calcolo GDD e Winkler
        const totalGDD = data.reduce((acc, d) => acc + d.dailyGDD, 0);
        const winklerClass = classifyWinkler(totalGDD) || "N/A";
        const gddPercentage = ((totalGDD / gddHistoric) * 100).toFixed(0);

        setClimate({
            gdd: totalGDD.toFixed(0),
            winkler: winklerClass,
            gddPercentage: gddPercentage,
        });

        // calcolo rischio fitosanitario
        const avgHumidity = data.reduce((a, d) => a + d.humidity, 0) / data.length;
        const avgTemp = data.reduce((a, d) => a + d.temperature, 0) / data.length;
        const riskValue = Math.min(100, Math.round((avgHumidity / 100) * (avgTemp / 30) * 100));

        setRisk(riskValue);
    }, []);



    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">{title}</h2>
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

            <div className="flex flex-col w-full mb-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

                    {/* Colonna Sinistra: Parametri Ambientali */}
                    <section className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MetricCard
                            title="Umidità"
                            value={10}
                            unit="%"
                            icon={<Droplet className="text-blue-300" />}
                            trend={-1.2}
                        />
                        <MetricCard
                            title="Precipitazioni"
                            value={200}
                            unit="mm"
                            icon={<CloudRain className="text-blue-600" />}
                            trend={-0.2}
                        />
                        <MetricCard
                            title="Ore Solari"
                            value={2}
                            unit="h"
                            icon={<Sunrise className="text-orange-300" />}
                            trend={+0.2}
                        />

                        <MetricCard
                            title="Valore"
                            value={2}
                            unit="h"
                            icon={<Sunrise className="text-orange-300" />}
                            trend={+0.2}
                        />

                    </section>

                    {/* Colonna Destra: Rischio Fitosanitario */}
                    <div className="col-span-2">
                        <RiskCard
                            title="Pressione Fitosanitaria"
                            subtitle="Rischio Malattie"
                            icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
                            info="Indice calcolato da modelli predittivi basati su temperatura e umidità."
                            value={risk}
                            diseases="Peronospora, Oidio"
                        />
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