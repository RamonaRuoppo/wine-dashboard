import { useEffect, useState } from "react";
import { generateVineyardData } from "../data/simulator";
import { AlertTriangle, ChartBar, ChevronDown, Circle, CloudRain, Droplets, Info, Sun, Thermometer, TrendingDown, TrendingUp } from "lucide-react";
import Card from "../components/Card";

function Overview() {
    const [vineyardData, setVineyardData] = useState([]);

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
    const gddCurrent = 1850;
    const gddHistoric = 1720;
    const gddPercentage = ((gddCurrent / gddHistoric) * 100).toFixed(0);

    const precipitationCurrent = 285; // mm
    const precipitationHistoric = 340; // mm
    const precipitationDiff = -16; // percentage

    const sunHoursCurrent = 1240;
    const sunHoursHistoric = 1150;
    const sunHoursDiff = +8; // percentage

    useEffect(() => {
        const data = generateVineyardData(30);
        setVineyardData(data);
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
                <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm text-gray-600">Somma Termica Effettiva</h3>
                                <div className="relative inline-block group">
                                    <Info size={12} className="cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 text-xs text-white bg-[#530711e2] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Il GDD misura l'accumulo di calore utile durante la stagione vegetativa.
                                        <br /> Rilevanza: Indica la velocità di maturazione. Un GDD alto può significare una vendemmia precoce e un alto grado zuccherino (potenziale alcolico).
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Growing Degree Days (GDD)</p>
                        </div>
                        <Sun className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="text-3xl text-[#722F37] mb-2">{gddCurrent}</div>
                    <progress value={Number(gddPercentage)} className="mb-2 h-2" />
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Media Storica: {gddHistoric}</span>
                        <span className="text-green-600">+{((gddCurrent - gddHistoric) / gddHistoric * 100).toFixed(1)}%</span>
                    </div>
                </Card>

                {/* Precipitazioni */}
                <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm text-gray-600">Indice di Siccità</h3>
                                <div className="relative inline-block group">
                                    <Info size={12} className="cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 text-xs text-white bg-[#530711e2] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Volume totale di pioggia caduta nel periodo cruciale. <br />
                                        Rilevanza: L'acqua influisce sulla dimensione dell'acino (Resa) e sullo stress idrico. Un basso indice di siccità indica stress idrico, che può ridurre la resa ma aumentare la concentrazione di zuccheri e polifenoli (migliore qualità).
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Precipitazioni Totali</p>
                        </div>
                        <CloudRain className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-3xl text-blue-600 mb-2">{precipitationCurrent} mm</div>
                    <div className="flex items-center gap-2 text-sm">
                        <TrendingDown className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-600">{precipitationDiff}% vs. Media</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Media Storica: {precipitationHistoric} mm
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full border border-orange-300">
                        Stress Idrico Moderato
                    </span>
                </Card>

                {/* Ore di sole */}
                <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm text-gray-600">Ore di Sole Totali</h3>
                                <div className="relative inline-block group">
                                    <Info size={12} className="cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 text-xs text-white bg-[#530711e2] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Il totale delle ore di luce solare nelle fasi finali di maturazione. <br />
                                        Rilevanza: Cruciali per la sintesi dei composti aromatici, dei polifenoli e degli zuccheri. Un aumento (come +8% vs. Media) è generalmente un indicatore di alta qualità potenziale.
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Durante la Maturazione</p>
                        </div>
                        <Sun className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="text-3xl text-yellow-600 mb-2">{sunHoursCurrent} h</div>
                    <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">+{sunHoursDiff}% vs. Media</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Media Storica: {sunHoursHistoric} h
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-300">
                        Condizioni Ottimali
                    </span>
                </Card>
            </div>

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

            {/* Parametri */}

            <p className="text-gray-900 mt-2">Parametri Ambientali</p>
            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Temperatura</h3>
                    <p className="text-2xl">{latest.temperature}°C</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Umidità</h3>
                    <p className="text-2xl">{latest.humidity}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Precipitazioni</h3>
                    <p className="text-2xl">{latest.rainfall}mm</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Ore Solari</h3>
                    <p className="text-2xl">{latest.sunlightHours} h</p>
                </div>
            </section>

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
