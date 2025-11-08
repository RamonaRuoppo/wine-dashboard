import { useEffect, useState } from "react";
import { generateVineyardData } from "../data/simulator";
import { Calendar, CloudRain, Droplet, Droplets, Grape, ShieldAlert, Sun, Thermometer, ThermometerSnowflake, TrendingDown, TrendingUp, Wine, Wrench } from "lucide-react";
import { calculateDailyGDD, classifyWinkler } from "../utils/climateCalculations";
import MetricCard from "../components/MetricCard";
import SummaryCard from "../components/SummaryCard";
import Chart from "../components/Chart";

const data = generateVineyardData(30);

function Overview() {
    const today = new Date().toISOString().split("T")[0];

    const [vineyardData, setVineyardData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [climate, setClimate] = useState({ gdd: 0, winkler: "", gddPercentage: 0 });

    // Indici climatici
    const gddHistoric = 1720;

    const precipitationCurrent = 285; // mm
    const precipitationHistoric = 340; // mm
    const precipitationDiff = -16; // percentage

    const sunHoursCurrent = 1240;
    const sunHoursHistoric = 1150;
    const sunHoursDiff = +8; // percentage

    const upTrendIcon = <TrendingUp className="w-4 h-4 text-green-600" />;
    const downTrendIcon = <TrendingDown className="w-4 h-4 text-red-600" />;

    useEffect(() => {
        const data = generateVineyardData(30);
        setVineyardData(data);
        const gddHistoric = 1920;


        // calcolo GDD e Winkler
        const totalGDD = calculateDailyGDD() || 0;
        const winklerClass = classifyWinkler(totalGDD) || "N/A";
        const gddPercentage = ((totalGDD / gddHistoric) * 100).toFixed(0);

        setClimate({
            gdd: totalGDD.toFixed(0),
            winkler: winklerClass,
            gddPercentage: gddPercentage,
        });
    }, []);

    if (!vineyardData.length) return <p>Caricamento dati...</p>

    const selectedData =
        vineyardData.find((d) => d.date === selectedDate) ||
        vineyardData[vineyardData.length - 1];

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold mb-4">Overview</p>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 
                            focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:border-[#722F37] 
                            transition-shadow shadow-sm cursor-pointer"
                />
            </div>

            {/* Indici Agronomici e Climatici */}

            <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-6 h-6 text-[#722F37]"></Thermometer>
                <h2 className="text-lg font-semibold text-gray-700">Indici Agronomici e Climatici</h2>
            </div>

            <div className="flex items-center gap-6 mb-6">
                <MetricCard
                    title="Temperatura media"
                    value={selectedData.temperature}
                    unit="°C"
                    icon={<ThermometerSnowflake className="text-orange-400" />}
                    valueColor={"text-gray-600"}
                />

                <MetricCard
                    title="Grado Brix"
                    unit={"%"}
                    value={selectedData.sugarLevel} //TODO: gestire gradi brix
                    icon={<Wine className="text-red-400" />}
                    valueColor={"text-gray-600"}
                />

                <MetricCard
                    title="Resa Uva"
                    value={selectedData.grapeYield}
                    unit="Q.li/Ha"
                    icon={<Grape className="text-purple-400" />}
                    valueColor={"text-gray-600"}
                />

                <MetricCard
                    title="Uso Idrico"
                    value={selectedData.waterUsed} //TODO: gestire uso 
                    valueColor={"text-gray-600"}
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

            {/* Monitoraggio */}

            <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Monitoraggio Operativo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* GDD - Growing Degree Days */}
                <SummaryCard //TODO: sistemare dati e progress bar
                    title="Somma Termica"
                    subtitle="Growing Degree Days (GDD)"
                    icon={<Sun className="w-5 h-5 text-orange-500" />}
                    info="Il GDD misura l'accumulo di calore utile durante la stagione vegetativa. Un valore alto può significare una vendemmia precoce e un grado zuccherino elevato."
                    value={climate.gdd + " °C/giorni"}
                    historicValue={gddHistoric}
                    diff={((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) + "%"}
                    diffIcon= {((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) > 0 ? upTrendIcon : downTrendIcon}
                    diffColor={((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) > 0 ? "text-green-600" : "text-red-600"}
                    progress={climate.gddPercentage}
                    badgeText={
                        climate.gddPercentage > 110
                            ? "Accumulazione Alta"
                            : climate.gddPercentage > 90
                                ? "Normale"
                                : "Bassa"
                    }
                    badgeColor={
                        climate.gddPercentage > 110
                            ? "text-red-600"
                            : climate.gddPercentage > 90
                                ? "text-green-600"
                                : "text-yellow-600"
                    }
                    badgeBg={
                        climate.gddPercentage > 110
                            ? "bg-red-100"
                            : climate.gddPercentage > 90
                                ? "bg-green-100"
                                : "bg-yellow-100"
                    }
                    badgeBorder={
                        climate.gddPercentage > 110
                            ? "border-red-300"
                            : climate.gddPercentage > 90
                                ? "border-green-300"
                                : "border-yellow-300"
                    }
                    color="#722F37"
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


            <Chart label="Umidità" dataKey={"humidity"} color="#3B82F6"
                data={vineyardData.slice(0, 25).map((d, i) => ({
                    hour: `${String(i).padStart(2, "0")}:00`,
                    humidity: d.humidity
                }))}
            />

        </div>
    );
}

export default Overview;
