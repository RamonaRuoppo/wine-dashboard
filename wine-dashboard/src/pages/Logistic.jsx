import { CalendarArrowDown, ColumnsSettings } from "lucide-react";
import Card from "../components/card/Card";
import MetricCard from "../components/MetricCard";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";

{/* 
    TODO:
        Resa uva per varietà
        Livelli zuccheri (Brix) e maturazione
        Efficienza del raccolto (resa vs input)
        Trend storici per annata
*/}

function Logistic() {
    const transportData = [
        { giorno: "01/09", uvaTrasportata: 12, kmPercorsi: 8, oreLavoro: 5 },
        { giorno: "02/09", uvaTrasportata: 18, kmPercorsi: 10, oreLavoro: 6 },
        { giorno: "03/09", uvaTrasportata: 9, kmPercorsi: 5, oreLavoro: 3 },
        { giorno: "04/09", uvaTrasportata: 10, kmPercorsi: 5, oreLavoro: 2 },
    ];

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Produzione e Qualità</h2>

            <div className="flex items-center gap-3 mb-6">
                <CalendarArrowDown className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Pianificazione della Vendemmia</h2>
            </div>

            <Card className="mb-6" title="Pianificazione Vendemmia">
                <p>Calendario raccolta per parcella</p>
                <p>Stato maturazione: 85%</p>
                <p>Data ottimale: 15 Settembre</p>
            </Card>

            <div className="flex items-center gap-3 mb-6">
                <CalendarArrowDown className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Movimentazione Interna</h2>
            </div>

            <Card className="mb-6">
                <p className="text-gray-400 mb-6">Tutto ciò che riguarda lo spostamento di risorse, prodotti e mezzi all’interno dell’azienda agricola</p>
                <LineChart width={"100%"} height={200} data={transportData}>
                    <XAxis dataKey="giorno" />
                    <YAxis />
                    <Legend/>
                    <Line type="monotone" dataKey="uvaTrasportata" stroke="#722F37" />
                    <Line type="monotone" dataKey="kmPercorsi" stroke="#2f3772ff" />
                    <Line type="monotone" dataKey="oreLavoro" stroke="#2f723cff" />
                </LineChart>

            </Card>

            <div className="flex items-center gap-3 mb-6">
                <ColumnsSettings className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Gestione Risorse in Campo</h2>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start divide-x divide-gray-200">

                <div className="mb-6 pr-6">
                    <p className="text-gray-500 mb-3">
                        Risorse in Campo
                    </p>
                    <div className="space-y-3 items-start">
                        <MetricCard title="Manodopera" value={12} unit="persone" />
                        <MetricCard title="Macchine" value={5} unit="unità" />
                        <MetricCard title="Ore lavoro" value={48} unit="h" />
                    </div>
                </div>

                <div className="mb-6 pl-6">
                    <p className="text-gray-500 mb-3">
                        Input Agricoli
                    </p>
                    <div className="space-y-3 items-start">
                        <MetricCard title="Irrigazione" value={1200} unit="L" />
                        <MetricCard title="Fertilizzanti" value={80} unit="kg" />
                        <MetricCard title="Trattamenti" value={3} unit="interventi" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logistic;