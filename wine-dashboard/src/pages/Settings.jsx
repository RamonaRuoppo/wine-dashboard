import { ChevronDown, Globe, Star, User } from "lucide-react";
import { useState } from "react";
import Modal from "../components/Modal";
import { vineyardList } from "../data/mockData";

const Settings = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleGenerateData = () => {
        setShowGenerateModal(true);
        console.log(`Generating simulated data from ${startDate} to ${endDate}`);
    };

    const handleDeleteAccount = () => {
        localStorage.clear();
        setShowDeleteModal(false);
        window.location.href = "/login"; 
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Impostazioni</h2>

            <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Informazioni Overview</h2>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-6">
                    <label className="text-sm text-gray-500 dark:text-gray-200 mb-2">Nome Azienda</label>
                    <h3 className="text-black-900 dark:text-white mb-2 pl-2 mt-1">Antinori</h3>
                    <label className="text-sm text-gray-500 dark:text-gray-200 ">Varietà selezionata:</label>
                    <div className="relative w-130 mb-2 mt-1">
                        <select
                            defaultValue="Antinori"
                            className="w-full appearance-none bg-white border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-4 py-2 pr-10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"
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

            {/* Preferences */}
            {/* <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Preferenze</h2>
            </div>
            */}

            {/* 
            <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400">
                        Altre info 
                    </p>
                </div>
            </div> 
            */}

            <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Parametri Stagionali</h2>
            </div>

            <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-6 space-y-4">
                <h3 className="text-sm text-gray-600 dark:text-gray-200">Seleziona le date di inizio e fine per reimpostare i parametri della finestra stagionale.</h3>
                <div className="w-80">
                    <label htmlFor="startDate" className="text-sm text-gray-500 dark:text-gray-400">Data inizio</label>
                    <input
                        id="startDate"
                        type="date"
                        className="w-full border border-gray-300 dark:text-gray-400 rounded-lg px-3 py-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="w-80">
                    <label htmlFor="endDate" className="text-sm text-gray-500 dark:text-gray-400">Data fine</label>
                    <input
                        id="endDate"
                        type="date"
                        className="w-full border border-gray-300 dark:text-gray-400 rounded-lg px-3 py-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button
                    className="mt-2 text-gray-900 dark:text-gray-500 px-4 py-2 rounded hover:bg-[#5b252c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGenerateData}
                    disabled={!startDate || !endDate}
                >
                    Reimposta periodo
                </button>
            </div>

            <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-900 mb-2">Elimina Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                        Una volta eliminato l'account, non c'è modo di tornare indietro. Tutti i tuoi dati,
                        inclusi vigneti, raccolti e report verranno eliminati definitivamente.
                    </p>
                    <button
                        className="delete-button"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Elimina Account
                    </button>
                </div>
            </div>

            {showGenerateModal && (
                <Modal
                    show={showGenerateModal}
                    title="Rigenerazione dati"
                    message={`Vuoi rigenerare i dati simulati dal ${startDate} al ${endDate}?`}
                    onConfirm={"confirm"}
                    onClose={() => setShowGenerateModal(false)}
                    confirmText="Conferma"
                    cancelText="Annulla"
                />

            )}

            {showDeleteModal && (
                <Modal
                    show={showDeleteModal}
                    title="Eliminazione account"
                    message="Questa funzione è simulata. In un contesto reale, l'utente avrebbe diritto alla cancellazione definitiva dei propri dati personali ai sensi dell'art. 17 del GDPR (“diritto all'oblio”)."
                    onConfirm={handleDeleteAccount}
                    onClose={() => setShowDeleteModal(false)}
                    cancelText="Chiudi"
                />
            )}
        </div>
    );
};

export default Settings;