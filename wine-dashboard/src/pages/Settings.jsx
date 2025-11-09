import { ChevronDown, Globe, Star, User } from "lucide-react";
import { useState } from "react";
import Modal from "../components/Modal";

const Settings = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleGenerateData = () => {
        setShowGenerateModal(true);
        console.log(`Generating simulated data from ${startDate} to ${endDate}`);
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Impostazioni</h2>
            <p className="text-gray-500 text-sm mb-6">
                Gestisci il tuo account e le preferenze dell'applicazione.
            </p>

            <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Informazioni Profilo</h2>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <label htmlFor="startDate" className="text-sm text-gray-500 mb-2">Nome Azienda</label>
                    <h3 className="text-black-900 mb-4 pl-2 mt-1">Antinori</h3>
                    <div className="relative w-80 mb-2">
                        <select
                            defaultValue="Antinori"
                            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"

                        >
                            {/* TODO: fix options */}
                            <option value="2025">Tenuta 1</option>
                            <option value="2024">Tenuta 2</option>
                            <option value="2023">Tenuta 3</option>
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
                <h2 className="text-gray-900">Parametri di Simulazione stagionale</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
                <div className="w-80">
                    <label htmlFor="startDate" className="text-sm text-gray-500">Data inizio</label>
                    <input
                        id="startDate"
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="w-80">
                    <label htmlFor="endDate" className="text-sm text-gray-500">Data fine</label>
                    <input
                        id="endDate"
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button
                    className="text-black px-4 py-2 rounded hover:bg-[#5b252c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGenerateData}
                    disabled={!startDate || !endDate}
                >
                    Rigenera dati simulati
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
                    message="Questa funzione è disabilitata per i test. Nessun dato è stato eliminato."
                    onClose={() => setShowDeleteModal(false)}
                    cancelText="Chiudi"
                />
            )}
        </div>
    );
};

export default Settings;