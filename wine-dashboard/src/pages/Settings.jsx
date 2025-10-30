import { Globe, User } from "lucide-react";

const Settings = () => {
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

            {/* Preferences */}
            <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-[#722F37]" />
                <h2 className="text-gray-900">Preferenze</h2>
            </div>

            <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-900 mb-2">Elimina Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                        Una volta eliminato l'account, non c'è modo di tornare indietro. Tutti i tuoi dati,
                        inclusi vigneti, raccolti e report verranno eliminati definitivamente.
                    </p>
                    <button className="delete-button">
                        Elimina Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;