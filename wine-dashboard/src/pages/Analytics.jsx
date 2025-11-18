import { fetchVineyardData } from "../data/simulator";
import { AlertTriangle, ChartBar, CheckCircle, CloudRain, ColumnsSettings, CrossIcon, Droplet, Euro, Globe, Info, Leaf, Sunrise, TrendingUp, X } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { useEffect, useState } from "react";
import { classifyWinkler } from "../utils/climateCalculations";
import RiskCard from "../components/RiskCard";
import { risksIndicators, vineyardList, vivaIndicators } from "../data/mockData";
import FilterBar from "../components/FilterBar";
import Chart from "../components/Chart";
import { temperatureSimulator } from "../utils/climateCalculations";
import { fetchPlanningData } from "../data/dataService";

const data = fetchVineyardData(30);

function Analytics() {
    const title = "Analytics";

    const [vineyardData, setVineyardData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);
    const [isCompliant, setIsCompliant] = useState(false);
    const [climate, setClimate] = useState({ gdd: 0, winkler: "", gddPercentage: 0 });
    const planning = fetchPlanningData();
    const resources = planning[0].resources;
    const [workers, machines] = resources.match(/\d+/g);

    useEffect(() => {
        const data = fetchVineyardData(30);
        const generatedYearly = temperatureSimulator(2025);

        setVineyardData(data);
        setYearlyData(generatedYearly);

        const totalGDD = data.reduce((acc, d) => acc + d.dailyGDD, 0);
        const winklerClass = classifyWinkler(totalGDD) || "N/A";
        const gddPercentage = ((totalGDD / 1720) * 100).toFixed(0);

        setClimate({
            gdd: totalGDD.toFixed(0),
            winkler: winklerClass,
            gddPercentage: gddPercentage,
        });

        const latestDay = data[data.length - 1];

        const allCompliant = vivaIndicators.map(indicator => {
            const key =
                indicator.subtitle === "Water Footprint" ? "waterFootprint" :
                    indicator.subtitle === "Carbon Footprint" ? "co2Emission" :
                        indicator.subtitle === "Gestione Agronomica" ? "agronomicManagement" :
                            "territoryResilience";

            const currentValue = latestDay[key];

            const compliant = key !== "territoryResilience"
                ? currentValue <= indicator.baseValue
                : currentValue >= indicator.baseValue;

            return { ...indicator, currentValue, compliant };
        });

        setIsCompliant(allCompliant);
    }, []);

    if (vineyardData.length === 0) {
        return <div>Caricamento dati...</div>;
    }

    const latest = vineyardData[vineyardData.length - 1];

    const avgHumidity = Math.round(
        vineyardData.reduce((sum, d) => sum + d.humidity, 0) / vineyardData.length
    );
    const avgRain = Math.round(
        vineyardData.reduce((sum, d) => sum + d.rainfall, 0) / vineyardData.length
    );
    const avgSun = Math.round(
        vineyardData.reduce((sum, d) => sum + d.sunlightHours, 0) / vineyardData.length
    );
    const gddHistoric = 1720;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="flex items-center gap-3 mb-6 mt-6">
                <ChartBar className="w-6 h-6 text-[#722F37]"></ChartBar>
                <h2 className="text-lg font-semibold text-gray-700">Efficienza del Raccolto</h2>
            </div>

            {/* <FilterBar /> */}

            <div className="grid grid-cols-2 lg:grid-cols-[1fr_3fr] gap-6 items-start">

                <div className="space-y-3">
                    <MetricCard
                        title="Umidità Media"
                        value={avgHumidity}
                        unit="%"
                        icon={<Droplet className="text-blue-300" />}
                    />
                    <MetricCard
                        title="Precipitazione Media"
                        value={avgRain}
                        unit="mm"
                        icon={<CloudRain className="text-blue-600" />}
                    />
                    <MetricCard
                        title="Ore Solari Medie"
                        value={avgSun}
                        unit="h"
                        icon={<Sunrise className="text-orange-300" />}
                    />
                </div>
                <Chart
                    height={"88%"}
                    xKey="day"
                    label="Annuale delle Temperature"
                    data={yearlyData.map((d, i) => {
                        const date = new Date(2025, 0, 1 + i);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");

                        return {
                            day: day + "/" + month,
                            minTemp: Number(d.minTemp),
                            maxTemp: Number(d.maxTemp)
                        };
                    })}
                    lines={[
                        { key: "minTemp", color: "#1E88E5", name: "Temperatura Minima" },
                        { key: "maxTemp", color: "#E53935", name: "Temperatura Massima" }
                    ]}
                />

            </div>

            <div className="flex items-center gap-3 mb-6 mt-8">
                <ColumnsSettings className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Gestione Risorse in Campo</h2>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start divide-x divide-gray-200">

                <div className="mb-6 pr-6">
                    <p className="text-gray-500 mb-3">
                        Risorse in Campo
                    </p>
                    <div className="w-full grid grid-cols-2 gap-3 items-start">
                        <MetricCard title="Manodopera" value={workers} unit="persone" />
                        <MetricCard title="Macchine" value={machines} unit="unità" />
                    </div>
                </div>

                <div className="mb-6 pl-6">
                    <p className="text-gray-500 mb-3">
                        Input Agricoli
                    </p>
                    <div className="w-full grid grid-cols-2 gap-3 items-start">
                        <MetricCard title="Irrigazione" value={latest.waterUsed} unit="L" />
                        <MetricCard title="Fertilizzanti" value={latest.fertilizerUsed} unit="kg" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6 mt-6">
                <AlertTriangle className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Rischio Sanitario</h2>
            </div>

            <div className="flex w-full gap-3 mb-6">
                {risksIndicators.map((r) => (
                    <div className="flex-1">
                        <RiskCard 
                        title={r.indicator}
                        subtitle="Rischio Malattia"
                        icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
                        value={r.value}
                    />
                    </div>
                ))}
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-xl mb-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">Fattore di Rischio</th>
                            <th scope="col" className="px-6 py-3">Descrizione</th>
                            <th scope="col" className="px-6 py-3">Sintomatologia</th>
                            <th scope="col" className="px-6 py-3">Livello</th>
                        </tr>
                    </thead>
                    <tbody>
                        {risksIndicators.map((r, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {r.indicator}
                                </th>
                                <td className="px-6 py-4">{r.description}</td>
                                <td className="px-6 py-4">{r.symptoms}</td>
                                <td className="px-6 py-4">{r.level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-3 mb-6 mt-4">
                <Leaf className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Sostenibilità VIVA</h2>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 items-start mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-800 col-span-1 lg:col-span-1">
                    <h4 className="text-md font-semibold text-gray-700">Water Footprint (VIVA)</h4>
                    <p className="text-2xl font-extrabold text-red-800 mt-2">{latest.waterFootprint}<span className="text-lg font-normal">L/L</span></p>
                    <p className="text-sm text-gray-500 mt-2">Target VIVA: {200} L/L</p>
                    <p className="text-xs font-semibold mt-1 'text-green-600">
                        {200}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-800 col-span-1 lg:col-span-1">
                    <h4 className="text-md font-semibold text-gray-700">Carbon Footprint (VIVA)</h4>
                    <p className="text-2xl font-extrabold text-red-800 mt-2">{latest.co2Emission}<span className="text-lg font-normal">Kg/L</span></p>
                    <p className="text-sm text-gray-500 mt-2">Target VIVA: {200} Kg/L</p>
                    <p className={`text-xs mt-1 text-red-600`}>
                        Base di Calcolo: Ore Lavoro Macchine
                    </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-gray-400 col-span-1">
                    <h4 className="text-md font-semibold text-gray-700">Trattamenti (Indice Territorio)</h4>
                    <p className="text-3xl font-extrabold text-gray-900 mt-2">
                        {latest.agronomicManagement} <span className="text-lg font-normal">interventi</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Target di Efficienza: {200} interventi</p>
                    <p className={`text-xs mt-1 ${200 > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        Varianza: {latest.territoryResilience}% vs Target Settimanale
                    </p>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-xl mb-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">Indicatore VIVA</th>
                            <th scope="col" className="px-6 py-3">Target</th>
                            <th scope="col" className="px-6 py-3">Descrizione</th>
                            <th scope="col" className="px-6 py-3">Valore Base</th>
                            <th scope="col" className="px-6 py-3">Valore Corrente</th>
                            <th scope="col" className="px-6 py-3">Conformità</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vivaIndicators.map((v, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {v.indicator}
                                </th>
                                <td className="px-6 py-4">{v.subtitle}</td>
                                <td className="px-6 py-4">{v.description}</td>
                                <td className="px-6 py-4">{v.baseValue + " " + v.unit}</td>
                                <td className="px-6 py-4">{v.currentValue + " " + v.unit}</td>
                                <td className="px-6 py-4">{isCompliant ? <CheckCircle className="text-green-500" /> : <X className="text-red-500" />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Analytics;