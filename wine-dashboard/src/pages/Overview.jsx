import { useEffect, useState } from "react";
import { generateVineyardData } from "../data/simulator";
import { AlertTriangle, Circle, CloudRain, Droplet, Droplets, Info, Sun, Sunrise, Thermometer, ThermometerSnowflake, TrendingDown, TrendingUp } from "lucide-react";
import Card from "../components/card/Card";
import { calculateGDD, classifyWinkler } from "../utils/climateCalculations";
import MetricCard from "../components/MetricCard";
import SummaryCard from "../components/SummaryCard";

function Overview() {
    const [vineyardData, setVineyardData] = useState([]);
    const [climate, setClimate] = useState({ gdd: 0, winkler: "",  gddPercentage: 0});

    const vineyard = [
        { name: "Vigneto A (Sangiovese)", value: 95, color: "#22c55e" },
        { name: "Vigneto B (Merlot)", value: 70, color: "#f59e0b" },
        { name: "Vigneto C (Trebbiano)", value: 110, color: "#10b981" },
    ];

    const qualityCostData = [
        { year: "2021", costo: 110, qualita: 19.2 },
        { year: "2022", costo: 115, qualita: 19.8 },
        { year: "2023", costo: 120, qualita: 20.1 },
        { year: "2024", costo: 129, qualita: 20.3 },
        { year: "2025", costo: 125, qualita: 20.5 },
    ];

    const grapeAllocationData = [
        { name: "DOCG", value: 65, color: "#722F37" },
        { name: "IGT", value: 30, color: "#D4AF37" },
        { name: "Declassata/Scarto", value: 5, color: "#ef4444" },
    ];

    // Indici climatici
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
        const gddHistoric = 1920;


        // calcolo GDD e Winkler
        const totalGDD = calculateGDD() || 0;
        const winklerClass = classifyWinkler(totalGDD) || "N/A";
        const gddPercentage = ((totalGDD / gddHistoric) * 100).toFixed(0);

        setClimate({
            gdd: totalGDD.toFixed(0),
            winkler: winklerClass,
            gddPercentage: gddPercentage,
        });
    }, []);

    if (!vineyardData.length) return <p>Caricamento dati...</p>

    const latest = vineyardData[vineyardData.length - 1];

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Overview</h2>
            <h2 className="text-xl font-semibold text-gray-500 mt-2 mb-6">Efficienza del Raccolto e Materia Prima</h2>

            {/* Indici Agronomici e Climatici */}

            <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-6 h-6 text-[#722F37]"></Thermometer>
                <h2 className="text-lg font-semibold text-gray-700">Indici Agronomici e Climatici</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* GDD - Growing Degree Days */}
                <SummaryCard //TODO: sistemare dati e progress bar
                    title="Somma Termica Effettiva"
                    subtitle="Growing Degree Days (GDD)"
                    icon={<Sun className="w-5 h-5 text-orange-500" />}
                    info="Il GDD misura l'accumulo di calore utile durante la stagione vegetativa. Un valore alto può significare una vendemmia precoce e un grado zuccherino elevato."
                    value={climate.gdd + " °C/giorni"}
                    historicValue={gddHistoric}
                    diff={((climate.gdd - gddHistoric) / gddHistoric * 100).toFixed(1) + "%"}
                    diffIcon={<TrendingUp className="w-4 h-4 text-green-600" />}
                    diffColor="text-green-600"
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
                    diffIcon={<TrendingDown className="w-4 h-4 text-orange-600" />}
                    diffColor="text-orange-600"
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
                    diffIcon={<TrendingUp className="w-4 h-4 text-green-600" />}
                    diffColor="text-green-600"
                    badgeText="Condizioni Ottimali"
                    badgeColor="text-green-600"
                    badgeBg="bg-green-100"
                    badgeBorder="border-green-300"
                    color={"orange"}
                />

            </div>

            {/* Parametri Ambientali */}
            <p className="text-gray-900 mt-6">Parametri Ambientali</p>
            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <MetricCard title={"Temperatura Media"} value={latest.temperature} unit="°C" icon={<ThermometerSnowflake className="text-red-400" />} trend={+2.1} />
                <MetricCard title={"Umidità"} value={latest.humidity} unit="%" icon={<Droplet className="text-blue-300" />} trend={-1.2} />
                <MetricCard title={"Precipitazioni"} value={latest.rainfall} unit="mm" icon={<CloudRain className="text-blue-600" />} trend={-0.2} />
                <MetricCard title={"Ore Solari"} value={latest.sunlightHours} unit="h" icon={<Sunrise className="text-orange-300" />} trend={+0.2} />
            </section>

            {/* Monitoraggio sanitario e operativo */}

            <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-6 h-6 text-[#722F37]"></Droplets>
                <h2 className="text-lg font-semibold text-gray-700">Monitoraggio Sanitario e Operativo</h2>
            </div>
            {/* Risk Indicators */}
            <div className="space-y-4 w-92"> {/* TODO: edit here width dimension */}
                {/* Phytosanitary Pressure */}
                <Card className="p-6 bg-white">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm text-gray-600">Pressione Fitosanitaria</h3>
                                <div className="relative inline-block group">
                                    <Info size={12} className="cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 text-xs text-white bg-[#530711e2] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Indice sintetico calcolato da modelli predittivi basati su temperatura e umidità. Valuta il rischio di attacchi di patogeni e la necessità di interventi fitosanitari.                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Rischio Malattie</p>
                        </div>
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-center py-4">
                        <div className="relative w-24 h-24">
                            <Circle size={100} color="#530711e2" /> {/* TODO: edit here circle and progress */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl text-gray-900">70%</span>
                            </div>
                        </div>
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 hover:bg-yellow-1000 rounded-full border border-yellow-300">
                        Rischio Medio
                    </span>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Peronospora, Oidio
                    </p>
                </Card>
            </div>

            {/* Parametri */}
            <p className="text-gray-900 mt-2">Parametri di Produzione</p>
            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Grado Brix</h3>
                    <p className="text-2xl">{latest.sugarLevel}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Acqua usata</h3>
                    <p className="text-2xl">{latest.waterUsed} L</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Fertilizzante usato</h3>
                    <p className="text-2xl">{latest.fertilizerUsed} kg</p>
                </div>
            </section>
        </div>
    );
}

export default Overview;
