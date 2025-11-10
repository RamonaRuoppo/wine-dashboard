import { CalendarArrowDown, ColumnsSettings } from "lucide-react";
import Card from "../components/card/Card";
import MetricCard from "../components/MetricCard";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { generatePlanningData, generateTransportData } from "../api/dataService";

function Logistic() {
    const planningData = generatePlanningData();
    const transportData = generateTransportData(7);

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Produzione e Qualità</h2>

            <div className="flex items-center gap-3 mb-6">
                <CalendarArrowDown className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Pianificazione della Vendemmia</h2>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-xl mb-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">Vigneto</th>
                            <th scope="col" className="px-6 py-3">Varietà</th>
                            <th scope="col" className="px-6 py-3">Stato maturazione</th>
                            <th scope="col" className="px-6 py-3">Data ottimale</th>
                            <th scope="col" className="px-6 py-3">Risorse necessarie</th>
                            <th scope="col" className="px-6 py-3">Quantità stimata</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planningData.map((v, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {v.vineyard}
                                </th>
                                <td className="px-6 py-4">{v.variety}</td>
                                <td className="px-6 py-4">{v.maturation_status}</td>
                                <td className="px-6 py-4">{v.optimal_date}</td>
                                <td className="px-6 py-4">{v.resources}</td>
                                <td className="px-6 py-4">{v.estimated_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <CalendarArrowDown className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Movimentazione Interna</h2>
            </div>

            <Card className="mb-6 even:dark:bg-gray-800 border-b dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-400 mb-6  dark:text-white">Tutto ciò che riguarda lo spostamento di risorse, prodotti e mezzi all’interno dell’azienda agricola</p>
                <LineChart width={"100%"} height={200} data={transportData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Legend />
                    <Line type="monotone" dataKey="uvaTrasportata" stroke="#722F37" />
                    <Line type="monotone" dataKey="kmPercorsi" stroke="#2f3772ff" />
                    <Line type="monotone" dataKey="oreLavoro" stroke="#2f723cff" />
                </LineChart>

            </Card>

            <div className="flex items-center gap-3 mb-6">
                <ColumnsSettings className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Gestione Risorse in Campo e Sostenibilità VIVA</h2>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start divide-x divide-gray-200">

                <div className="mb-6 pr-6">
                    <p className="text-gray-500 mb-3">
                        Risorse in Campo
                    </p>
                    <div className="w-full grid grid-cols-2 gap-3 items-start">
                        <MetricCard title="Manodopera" value={12} unit="persone" />
                        <MetricCard title="Macchine" value={5} unit="unità" />
                        <MetricCard title="Ore lavoro" value={48} unit="h" />
                    </div>
                </div>

                <div className="mb-6 pl-6">
                    <p className="text-gray-500 mb-3">
                        Input Agricoli
                    </p>
                    <div className="w-full grid grid-cols-2 gap-3 items-start">
                        <MetricCard title="Irrigazione" value={1200} unit="L" />
                        <MetricCard title="Fertilizzanti" value={80} unit="kg" />
                        <MetricCard title="Trattamenti" value={3} unit="interventi" />
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-800 col-span-1 lg:col-span-1">
                    <h4 className="text-md font-semibold text-gray-700">Water Footprint (VIVA)</h4>
                    <p className="text-2xl font-extrabold text-red-800 mt-2">{200} <span className="text-lg font-normal">L/L</span></p>
                    <p className="text-sm text-gray-500 mt-2">Target VIVA: {200} L/L</p>
                    <p className="text-xs font-semibold mt-1 'text-green-600">
                        {200}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-800 col-span-1 lg:col-span-1">
                    <h4 className="text-md font-semibold text-gray-700">Carbon Footprint (VIVA)</h4>
                    <p className="text-2xl font-extrabold text-red-800 mt-2">{200} <span className="text-lg font-normal">Kg/L</span></p>
                    <p className="text-sm text-gray-500 mt-2">Target VIVA: {200} Kg/L</p>
                    <p className={`text-xs mt-1 text-red-600`}>
                        Base di Calcolo: Ore Lavoro Macchine
                    </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-gray-400 col-span-1">
                    <h4 className="text-md font-semibold text-gray-700">Trattamenti (Indice Territorio)</h4>
                    <p className="text-3xl font-extrabold text-gray-900 mt-2">
                        {200} <span className="text-lg font-normal">interventi</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Target di Efficienza: {200} interventi</p>
                    <p className={`text-xs mt-1 ${200 > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        Varianza: {200}% vs Target Settimanale
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Logistic;