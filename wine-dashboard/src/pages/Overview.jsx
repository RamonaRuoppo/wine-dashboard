import { useEffect, useState } from "react";
import { generateVineyardData } from "../data/simulator";

function Overview() {
    const [vineyardData, setVineyardData] = useState([]);

    useEffect(() => {
        const data = generateVineyardData(30);
        setVineyardData(data);
    }, []);

    if (!vineyardData.length) return <p>Caricamento dati...</p>

    const latest = vineyardData[vineyardData.length - 1];

    return (
        <div>
            <h1 className="font-semibold mb-6">Overview</h1>
            <h2 className="text-xl font-semibold text-gray-500 mt-2">Gestione Vigneto</h2>

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
