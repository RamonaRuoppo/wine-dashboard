import { ChevronDown, Globe, User } from "lucide-react";
import { useState } from "react";

const Settings = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Impostazioni</h2>
            <p className="text-gray-500 text-sm mb-6">
                Gestisci il tuo account e le preferenze dell'applicazione.
            </p>

            <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Informazioni Profilo</h2>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                        Nome Azienda
                    </p>
                    <h3 className="text-black-900 mb-4 pl-2">Antinori</h3>
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
            <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Preferenze</h2>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400">
                        Altre info {/* TODO: aggiungere informazioni qui */}
                    </p>
                </div>
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
                        onClick={() => setShowModal(true)}
                    >
                        Elimina Account
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 text-center">
                        <h2 className="text-lg font-semibold mb-4">Eliminazione account</h2>
                        <p className="mb-6">
                            Questa funzione è disabilitata per i test. Nessun dato è stato eliminato.
                        </p>
                        <button
                            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => setShowModal(false)}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;