import { ChevronDown } from "lucide-react";
import { vineyardList } from "../data/mockData";

const FilterBar = () => {
    return (
        <h3 className="font-semibold mb-4 text-gray-700">Filtri</h3>,

        <div className="flex flex-wrap gap-4 mb-6">
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

            <div className="flex-2 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vigneto
                </label>
                <div className="relative w-full">
                    <select
                        defaultValue="Antinori"
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"

                    >
                        {vineyardList.map((v) => (
                            <option key={v.name} value={v.name}>
                                {v.name} – {v.variety}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;