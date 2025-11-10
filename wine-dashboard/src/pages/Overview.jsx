import { useEffect, useState } from "react";
import { fetchVineyardData } from "../data/simulator";
import { CloudRain, Droplet, Grape, ShieldAlert, Sun, Thermometer, ThermometerSnowflake, TrendingDown, TrendingUp, Wine, Wrench } from "lucide-react";
import { calculateHuglinIndex, calculateWinklerIndex, classifyHuglin, classifyWinkler, temperatureSimulator } from "../utils/climateCalculations";
import MetricCard from "../components/MetricCard";
import SummaryCard from "../components/SummaryCard";
import Chart from "../components/Chart";

function Overview() {
    const title = "Overview";
    const today = new Date().toISOString().split("T")[0];

    const [vineyardData, setVineyardData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
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
        const thirtyDaysData = fetchVineyardData(yearlyData, 365);
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

    if (!Array.isArray(vineyardData) || vineyardData.length === 0) {
        return <p>Caricamento dati...</p>;
    }

    const selectedData =
        vineyardData.find((d) => d.date === selectedDate) ||
        vineyardData[vineyardData.length - 1];

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold mb-6">{title}</p>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-white border border-gray-300 rounded-xl px-2 py-1 text-sm text-gray-700 
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
                />

                <MetricCard
                    title="Grado Brix"
                    unit={"%"}
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

            {/* Monitoraggio */}

            <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Monitoraggio Operativo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                {/* INDICE DI HUGLIN (HI) */}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-8">
                {/* INDICE DI WINKLER (IW) - Totale GDD */}
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



                <Chart
                    label="Umidità"
                    dataKey={"humidity"}
                    color="#3B82F6"
                    data={vineyardData.slice(0, 25).map((d, i) => ({
                        hour: `${String(i).padStart(2, "0")}:00`,
                        humidity: d.humidity
                    }))}
                />

                <Chart
                    label="Grado Brix (%)"
                    dataKey={"sugarLevel"}
                    color="#8E24AA" // Viola
                    data={vineyardData.slice(0, 25).map((d, i) => ({
                        hour: `${String(i).padStart(2, "0")}:00`,
                        sugarLevel: d.sugarLevel
                    }))}
                />
            </div>


        </div>
    );
}

export default Overview;
