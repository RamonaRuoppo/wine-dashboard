import { CalendarArrowDown, Euro, FileChartColumnIncreasingIcon, LineChartIcon, LineSquiggle } from "lucide-react";
import Card from "../components/card/Card";
import MetricCard from "../components/MetricCard";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { fetchPlanningData, fetchTransportData } from "../api/dataService";
import { generateFinancialData } from "../data/simulator";

function Logistic() {
    const planningData = fetchPlanningData();
    const transportData = fetchTransportData(7);

    const data = generateFinancialData();

    const ricaviTotali = data.reduce((sum, d) => sum + parseFloat(d.ricavi), 0);
    const costiTotali = data.reduce((sum, d) => sum + parseFloat(d.costi), 0);
    const margineMedio = ((ricaviTotali - costiTotali) / ricaviTotali * 100).toFixed(1);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Produzione e Qualità</h2>

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
                <LineSquiggle className="w-6 h-6 text-[#722F37]" />
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
                <FileChartColumnIncreasingIcon className="w-6 h-6 text-[#722F37]" />
                <h2 className="text-lg font-semibold text-gray-700">Performance Finanziaria</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <MetricCard title="Ricavi Totali" value={ricaviTotali.toLocaleString()} unit="€" icon={<Euro className="dark:text-gray-400"/>} />
                <MetricCard title="Costi Totali" value={costiTotali.toLocaleString()} unit="€" icon={<Euro className="dark:text-gray-400"/>} />
                <MetricCard title="Margine Medio" value={margineMedio} unit="%" icon={<LineChartIcon className="dark:text-gray-400"/>} />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-xl mb-3">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-6">Tenuta</th>
                            <th scope="col" className="px-6 py-6">Varietà</th>
                            <th scope="col" className="px-6 py-6">Produzione (t)</th>
                            <th scope="col" className="px-6 py-6">Prezzo medio €/kg</th>
                            <th scope="col" className="px-6 py-6">Ricavi (€)</th>
                            <th scope="col" className="px-6 py-6">Costi (€)</th>
                            <th scope="col" className="px-6 py-6">Margine (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium">{d.name}</td>
                                <td className="px-6 py-4">{d.variety}</td>
                                <td className="px-6 py-4">{d.produzione}</td>
                                <td className="px-6 py-4">{d.prezzo}</td>
                                <td className="px-6 py-4">{parseInt(d.ricavi).toLocaleString()}</td>
                                <td className="px-6 py-4">{parseInt(d.costi).toLocaleString()}</td>
                                <td className="px-6 py-4">{d.margine}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Logistic;