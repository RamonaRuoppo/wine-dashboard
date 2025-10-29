import { useEffect, useState } from "react";
import { generateVineyardData } from "../data/simulator";

function Overview() {
    const [vineyardData, setVineyardData] = useState([]);

    const distributionData = [
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


    useEffect(() => {
        const data = generateVineyardData(30);
        setVineyardData(data);
    }, []);

    if (!vineyardData.length) return <p>Caricamento dati...</p>

    const latest = vineyardData[vineyardData.length - 1];

    return (
        <div>
            <h1 className="font-semibold mb-6">Overview</h1>
            <h2 className="text-xl font-semibold text-gray-500 mt-2 mb-6">Efficienza del Raccolto e Materia Prima</h2>

            <h2 className="text-lg font-semibold mb-4 text-gray-700">Filtri</h2>
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
                        {/* Freccetta a destra */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
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
                        {/* Freccetta a destra */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
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
                        {/* Freccetta a destra */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

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
