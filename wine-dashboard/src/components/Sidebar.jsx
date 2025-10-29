import { BarChart3, LayoutDashboard, LogOut, Settings, Sprout } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Sidebar({ onLogout }) {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 w-full rounded-xl transition-colors duration-200
   ${isActive
            ? "bg-white/10  text-gray-100"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <aside className="flex flex-col justify-between h-full text-xl text-gray-100 font-regular mb-2 p-2 mt-2">
            <div>
                <h3 className="text-2xl mb-6 flex items-center gap-3">
                    <Sprout className="bg-gradient-to-br from-purple-600 to-red-600 p-3 rounded-2xl w-12 h-12 text-white shadow-lg" />
                    WineMetrics
                </h3>
                <hr className="border-t border-white/10 my-4 mb-12" />
                <h4 className="text-base font-regular text-gray-300 mb-6">MENU</h4>

                <nav className="flex flex-col space-y-4 mb-10">
                    <NavLink to="/" className={linkClasses}>
                        <LayoutDashboard size={18} className="text-white" />
                        <span className="text-white">Overview</span>
                    </NavLink>

                    <NavLink to="/analytics" className={linkClasses}>
                        <BarChart3 size={18} className="text-white" />
                        <span className="text-white">Analytics</span>
                    </NavLink>
                </nav>

                <h4 className="text-base font-regular text-gray-300 mb-6 ">GENERALI</h4>

                <nav className="flex flex-col space-y-4">
                    <NavLink to="/settings" className={linkClasses}>
                        <Settings size={18} className="text-white" />
                        <span className="text-white">Impostazioni</span>
                    </NavLink>


                </nav>
            </div>

            <div>


                <hr className="border-t border-white/10 my-4" />
                <button
                    type="button"
                    onClick={onLogout}
                    className="logout-button flex items-center gap-2 px-4 py-2  border-none outline-none hover:text-gray-300 hover:bg-white/5 rounded-xl transition"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;