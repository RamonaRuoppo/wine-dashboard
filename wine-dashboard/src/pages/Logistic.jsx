import { CalendarArrowDown, ColumnsSettings } from "lucide-react";
import Card from "../components/card/Card";
import MetricCard from "../components/MetricCard";
import { Line, LineChart, XAxis, YAxis } from "recharts";

{/* 
    TODO:
        Resa uva per varietà
        Livelli zuccheri (Brix) e maturazione
        Efficienza del raccolto (resa vs input)
        Trend storici per annata
*/}

function Logistic() {
    const transportData = [
        { giorno: "01/09", tonnellateTrasportate: 12 }, //TODO: creare simulatore
        { giorno: "02/09", tonnellateTrasportate: 18 },
        { giorno: "03/09", tonnellateTrasportate: 9 },
        { giorno: "04/09", tonnellateTrasportate: 15 },
        { giorno: "05/09", tonnellateTrasportate: 20 },
    ];

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Produzione e Qualità</h2>
            <p className="text-gray-500 mb-6">
                Gestione operativa delle attività agricole: raccolta e risorse.
            </p>

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

            <Card title="Movimentazione Interna" className="mb-6">
                <LineChart width={400} height={200} data={transportData}>
                    <XAxis dataKey="giorno" />
                    <YAxis />
                    <Line type="monotone" dataKey="tonnellateTrasportate" stroke="#722F37" />
                </LineChart>

            </Card>

            <div className="flex items-center gap-3 mb-6">
                <ColumnsSettings className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Gestione Risorse in Campo</h2>
            </div>

            <p className="text-gray-500 mb-3">
                Risorse in Campo
            </p>
            <div className="mb-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                <MetricCard title="Manodopera" value={12} unit="persone" />
                <MetricCard title="Macchine" value={5} unit="unità" />
                <MetricCard title="Ore lavoro" value={48} unit="h" />
            </div>

            <p className="text-gray-500 mb-3">
                Input Agricoli
            </p>
            <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                <MetricCard title="Irrigazione" value={1200} unit="L" />
                <MetricCard title="Fertilizzanti" value={80} unit="kg" />
                <MetricCard title="Trattamenti" value={3} unit="interventi" />
            </div>



        </div>
    );
}

export default Logistic;