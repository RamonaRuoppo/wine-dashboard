import { BadgeInfo, ChevronDown, Globe, RefreshCcw, Settings2, User } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const Settings = () => {
    const [username, setUsername] = useState(() => localStorage.getItem("user_username") || "Utente");
    const [language, setLanguage] = useState(() => localStorage.getItem("language") || "it");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const handleResetData = () => { //simulazione
        localStorage.setItem("resetSimData", "true");
        setShowResetModal(false);
        window.location.href = "/login";
    }

    const handleDeleteAccount = () => { //simulazione
        localStorage.clear();
        setShowDeleteModal(false);
        window.location.href = "/login";
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Impostazioni</h2>

            <div className="flex items-center gap-3 mb-4">
                <BadgeInfo className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Informazioni</h2>
            </div>

            <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-6 text-sm">
                <p className="text-gray-700 dark:text-gray-200">
                    Nome applicazione:{" "}
                    <span className="font-semibold text-black dark:text-white">
                        WineMetrics Dashboard
                    </span>
                </p>
                <p className="text-gray-700 dark:text-gray-200 mt-1">
                    Versione:{" "}
                    <span className="font-semibold text-black dark:text-white">
                        1.0.0
                    </span>
                </p>
                <p className="text-gray-700 dark:text-gray-200 mt-1">
                    Autore:{" "}
                    <span className="font-semibold text-black dark:text-white">
                        Ramona Ruoppo
                    </span>
                </p>

                {/* <div>
                    <label className="mt-6 flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-1">
                        <Globe className="w-4 h-4 text-[#722F37]" />
                        Lingua
                    </label>
                    <div className="relative w-60 mt-3 mb-1">
                        <select
                            defaultValue={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 shadow-sm"
                        >
                            <option value="it">Italiano</option>
                            <option value="en">Inglese</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div> */}
            </div>

            {/* RESET DATI SIMULATI */}
            <div className="flex items-center gap-3 mb-4">
                <RefreshCcw className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900 dark:text-white">Dati simulati</h2>
            </div>

            <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-6 text-sm">
                <p className="text-gray-500 dark:text-gray-200 mb-3">
                    È possibile simulare una rigenerazione dei dati climatici e produttivi.
                    <br /> Nel contesto di questo project work l'operazione non modifica dati reali, ma
                    rappresenta il comportamento di un sistema che consente di aggiornare il
                    dataset.
                </p>
                <button
                    onClick={() => setShowResetModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37] text-black rounded-md hover:bg-[#5b252c] transition text-sm"
                >
                    <RefreshCcw className="w-4 h-4 text-black" />
                    Rigenera dati simulati
                </button>
            </div>

            {/* ACCOUNT */}
            <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900 dark:text-white">Account</h2>
            </div>

            <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-6 text-sm">
                <div className="flex mb-2 gap-2">
                    <h3 className="text-gray-500 dark:text-gray-200">Nome Azienda:</h3>
                    <h3 className="text-black dark:text-white font-medium">Antinori</h3>
                </div>
                <div className="flex gap-2">
                    <h3 className="text-gray-500 dark:text-gray-200">Utente attivo:</h3>
                    <h3 className="text-black dark:text-white font-medium">{username}</h3>
                </div>
            </div>

            {/* ELIMINA ACCOUNT */}
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

            {showResetModal && (
                <Modal
                    show={showResetModal}
                    title="Rigenerazione dati"
                    message={
                        <div className="text-sm leading-relaxed text-gray-400 dark:text-gray-500">
                            <p>
                                Questa operazione simula la rigenerazione dei dati climatici e produttivi.
                            </p>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                Confermando verrai reindirizzato alla schermata di login.
                            </p>
                            <p className="mt-4 font-medium text-gray-700 dark:text-gray-300">
                                Procedere?
                            </p>
                        </div>
                    }
                    onConfirm={handleResetData}
                    onClose={() => setShowResetModal(false)}
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