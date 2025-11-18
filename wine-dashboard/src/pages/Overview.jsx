import { useEffect, useState } from "react";
import { calculateGrapePrimeCost, fetchVineyardData, simulateHourlyVineyardData } from "../data/simulator";
import { CloudRain, Droplet, Grape, ShieldAlert, Sun, Thermometer, ThermometerSnowflake, TrendingDown, TrendingUp, Wine, Wrench } from "lucide-react";
import { calculateHuglinIndex, calculateWinklerIndex, classifyHuglin, classifyWinkler, temperatureSimulator } from "../utils/climateCalculations";
import MetricCard from "../components/MetricCard";
import SummaryCard from "../components/SummaryCard";
import Chart from "../components/Chart";
import { baseDailyCosts } from "../data/mockData";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import Card from "../components/card/Card";

function Overview() {
    const title = "Overview";
    const today = new Date().toISOString().split("T")[0];

    const [vineyardData, setVineyardData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [activeDate, setActiveDate] = useState(today);
    const [climate, setClimate] = useState({
        gdd: 0,
        winkler: { region: "N/A", description: "" },
        huglin: { region: "N/A", description: "" },
        gddPercentage: 0
    });

    const gddHistoric = 1720;

    const precipitationCurrent = 285; // mm
    const precipitationHistoric = 340; // mm
    const precipitationDiff = -16; // percentage
    const sunHoursCurrent = 1240;
    const sunHoursHistoric = 1150;
    const sunHoursDiff = +8; // percentage

    const upTrendIcon = <TrendingUp className="w-4 h-4 text-green-600" />;
    const downTrendIcon = <TrendingDown className="w-4 h-4 text-red-600" />;
    const isDark = document.documentElement.classList.contains("dark");


    useEffect(() => {
        const yearlyData = temperatureSimulator(2025);

        // Chiamata che popola la dashboard
        const thirtyDaysData = fetchVineyardData(yearlyData, 30);
        setVineyardData(thirtyDaysData);

        // --- Calcoli Winkler (IW) ---
        const totalGDD = calculateWinklerIndex(yearlyData);
        const winklerClass = classifyWinkler(totalGDD);

        const gddHistoric = 1972;
        const gddPercentage = ((totalGDD / gddHistoric) * 100).toFixed(0);

        // --- Calcoli Huglin (HI) ---
        const kFactor = 1.06; // Esempio: Nord Italia
        const huglinTotal = calculateHuglinIndex(yearlyData, kFactor);
        const huglinClass = classifyHuglin(huglinTotal);


        setClimate({
            gdd: totalGDD.toFixed(0),
            winkler: winklerClass,
            huglin: huglinClass,
            gddPercentage: gddPercentage,
        });

    }, []);

    const selectedData =
        vineyardData.find((d) => d.date === activeDate) ||
        vineyardData[vineyardData.length - 1] || {};

    useEffect(() => {
        if (!selectedData) return;

        const hourly = simulateHourlyVineyardData(selectedData.humidity ?? 60);
        setHourlyData(hourly);
    }, [activeDate, selectedData]);

    if (!Array.isArray(vineyardData) || vineyardData.length === 0) {
        return <p>Caricamento dati...</p>;
    }

    const chartData = vineyardData.slice(0, 25).map((d, i) => ({
        day: i + 1,
        grapePrimeCost: d.grapePrimeCost,
        grossMargin: d.grossMargin,
        humidity: d.humidity,
        sugarLevel: d.sugarLevel,
        gddIndex: d.dailyGDD,
        huglinIndex: d.huglinIndex ?? 0
    }));

    return (
        <div>
            <p className="text-2xl font-semibold mb-6">{title}</p>

            {/* Indici Agronomici e Climatici */}

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Thermometer className="w-6 h-6 text-[#722F37]"></Thermometer>
                    <h2 className="text-lg font-semibold text-gray-700">Indici Agronomici e Climatici</h2>
                </div>
                <input
                    type="date"
                    value={activeDate}
                    onChange={(e) => setActiveDate(e.target.value)}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 border border-gray-300 rounded-xl px-2 py-1 text-sm text-gray-700 dark:text-gray-300
                            focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:border-[#722F37] 
                            transition-shadow shadow-sm cursor-pointer"
                />
            </div>

            <div className="flex items-center gap-6 mb-6">
                <MetricCard
                    title="Temperatura media"
                    value={selectedData.temperature}
                    unit="°C"
                    icon={<ThermometerSnowflake className="text-orange-400" />}
                />

                <MetricCard
                    title="Grado Brix"
                    unit="°Brix"
                    value={selectedData.sugarLevel} //TODO: gestire gradi brix
                    icon={<Wine className="text-red-400" />}
                />

                <MetricCard
                    title="Resa Uva"
                    value={selectedData.grapeYield}
                    unit="Q.li/Ha"
                    icon={<Grape className="text-purple-400" />}
                />

                <MetricCard
                    title="Uso Idrico"
                    value={selectedData.waterUsed} //TODO: gestire uso 
                    unit={"L/L"}
                    icon={<Droplet className="text-blue-400" />}
                />

                <MetricCard
                    title="Rischio Sanitario"
                    value={"Basso"} //TODO: gestire livelli
                    valueColor={"text-green-600"}
                    icon={<ShieldAlert className="text-green-600" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-8">

                {(() => {
                    const hourlyDataFixed = hourlyData.map(h => ({
                        ...h,
                        sunlightPercent: Math.min(100, (h.sunlightFactor / 1200) * 100)
                    }));
                    return (
                        <>
                            <Chart
                                height={250}
                                xKey="hour"
                                label="Orario Umidità e Zuccheri"
                                data={hourlyDataFixed}
                                lines={[
                                    { key: "humidityPerHour", color: "#2196F3", name: "Umidità (%)" },
                                    { key: "sugarLevel", color: "#E53935", name: "Zuccheri (°Brix)" }
                                ]}
                            />
                            <Chart
                                height={250}
                                xKey="hour"
                                label="Giornaliero Irraggiamento – Zuccheri"
                                data={hourlyDataFixed}
                                lines={[
                                    { key: "sunlightPercent", name: "Irraggiamento solare (%)", color: "#FB8C00" },
                                    { key: "sugarLevel", color: "#E53935", name: "Zuccheri (°Brix)" }
                                ]}
                            />
                        </>
                    );
                })()}
            </div>


            <div className="w-full grid grid-cols-2 lg:grid-cols-[1fr_3fr] gap-6 items-start mb-10 mt-6">
                <div className=" grid grid-cols-1 gap-3">
                    <div className="bg-white dark:border-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-red-800 col-span-1 lg:col-span-1">
                        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">Water Footprint (VIVA)</h4>
                        <p className="text-2xl font-extrabold text-red-800 mt-2">
                            {selectedData.waterFootprint?.toFixed(2)} <span className="text-lg font-normal">L/L</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Target VIVA: 1.15 L/L</p>
                    </div>
                    <div className="bg-white dark:border-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-red-800 col-span-1 lg:col-span-1">
                        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">Carbon Footprint (VIVA)</h4>
                        <p className="text-2xl font-extrabold text-red-800 mt-2">
                            {selectedData.co2Emission?.toFixed(2)} <span className="text-lg font-normal">Kg/L</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Target VIVA: 0.12 Kg/L</p>
                    </div>
                </div>

                {(() => {
                    const hourlyDataFixed = hourlyData.map(h => ({
                        ...h,
                        sunlightPercent: Math.min(100, (h.sunlightFactor / 1200) * 100)
                    }));
                    return (
                        <Chart
                            height={"92%"}
                            xKey="hour"
                            label="Performance Finanziaria"
                            data={hourlyDataFixed}
                            lines={[
                                { key: "grapePrimeCost", color: "#3B82F6", name: "Costo Primo (€ / kg)" },
                                { key: "grossMargin", color: "#22C55E", name: "Margine Lordo (%)" },
                            ]}
                        />
                    );
                })()}

            </div>

            {/* Monitoraggio */}

            <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Monitoraggio Operativo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Indice di HUGLIN (HI) */}
                <SummaryCard
                    title="Indice Eliotermico"
                    subtitle={`Classe: ${climate.huglin.region} - ${climate.huglin.name}`}
                    icon={<Sun className="w-5 h-5 text-yellow-500" />}
                    info={`L'Indice di Huglin (HI) pondera il calore con le ore di luce. Vocazione: ${climate.huglin.vitigni}`}
                    value={climate.huglin.interval} // Mostra l'intervallo HI per coerenza
                    historicValue={"~2000 HI"} // Valore storico di esempio
                    diff={sunHoursDiff + "%"}
                    diffIcon={sunHoursDiff > 0 ? upTrendIcon : downTrendIcon}
                    diffColor={sunHoursDiff > 0 ? "text-green-600" : "text-red-600"}
                    badgeText={climate.huglin.name}
                    badgeColor={
                        climate.huglin.region === "V" || climate.huglin.region === "I" ? "text-red-600" : "text-green-600"
                    }
                    badgeBg={
                        climate.huglin.region === "V" || climate.huglin.region === "I" ? "bg-red-100" : "bg-green-100"
                    }
                    badgeBorder={
                        climate.huglin.region === "V" || climate.huglin.region === "I" ? "border-red-300" : "border-green-300"
                    }
                    color={"#FFC107"}
                />

                {/* Indice di WINKLER - Totale GDD */}
                <SummaryCard
                    title="Indice di Winkler"
                    subtitle={`Classe: ${climate.winkler.region} - ${climate.winkler.name}`}
                    icon={<Sun className="w-5 h-5 text-orange-500" />}
                    info={`Classificazione climatica basata sulla somma termica (GDD) annuale. Vocazione: ${climate.winkler.description}`}
                    value={climate.gdd + " °C/giorni"}
                    historicValue={gddHistoric}
                    diff={((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) + "%"}
                    diffIcon={((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) > 0 ? upTrendIcon : downTrendIcon}
                    diffColor={((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) > 0 ? "text-green-600" : "text-red-600"}
                    progress={climate.gddPercentage}
                    badgeText={climate.winkler.name}
                    badgeColor={
                        climate.winkler.region === "V" || climate.winkler.region === "I" ? "text-red-600" : "text-green-600"
                    }
                    badgeBg={
                        climate.winkler.region === "V" || climate.winkler.region === "I" ? "bg-red-100" : "bg-green-100"
                    }
                    badgeBorder={
                        climate.winkler.region === "V" || climate.winkler.region === "I" ? "border-red-300" : "border-green-300"
                    }
                    color={isDark ? "#dededeff" : "#888888ff"}
                />

                {/* Precipitazioni */}
                <SummaryCard
                    title="Indice di Siccità"
                    subtitle="Precipitazioni Totali"
                    value={precipitationCurrent + " mm"}
                    icon={<CloudRain className="w-5 h-5 text-blue-500" />}
                    info="Volume totale di pioggia caduta nel periodo cruciale. Rilevanza: L'acqua influisce sulla dimensione dell'acino (Resa) e sullo stress idrico. Un basso indice di siccità indica stress idrico, che può ridurre la resa ma aumentare la concentrazione di zuccheri e polifenoli (migliore qualità)."
                    diff={precipitationDiff + "%"}
                    diffIcon={precipitationDiff > 0 ? upTrendIcon : downTrendIcon}
                    diffColor={precipitationDiff > 0 ? "text-green-600" : "text-red-600"}
                    historicValue={precipitationHistoric + "mm"}
                    badgeText="Stress Idrico Moderato"
                    badgeColor="text-orange-600"
                    badgeBg="bg-orange-100"
                    badgeBorder="border-orange-300"
                    color={"#2196F3"}
                />

                {/* Ore di sole */}
                <SummaryCard
                    title="Ore di Sole Totali"
                    subtitle="Durante la Maturazione"
                    icon={<Sun className="w-5 h-5 text-yellow-500" />}
                    value={sunHoursCurrent + " h"}
                    info="Il totale delle ore di luce solare nelle fasi finali di maturazione. Rilevanza: Cruciali per la sintesi dei composti aromatici, dei polifenoli e degli zuccheri. Un aumento (come +8% vs. Media) è generalmente un indicatore di alta qualità potenziale."
                    historicValue={sunHoursHistoric + " h"}
                    diff={sunHoursDiff + "%"}
                    diffIcon={sunHoursDiff > 0 ? upTrendIcon : downTrendIcon}
                    diffColor={sunHoursDiff > 0 ? "text-green-600" : "text-red-600"}
                    badgeText="Condizioni Ottimali"
                    badgeColor="text-green-600"
                    badgeBg="bg-green-100"
                    badgeBorder="border-green-300"
                    color={"orange"}
                />

            </div>

        </div>
    );
}

export default Overview;
