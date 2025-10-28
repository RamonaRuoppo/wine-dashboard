import { BarChart3, LayoutDashboard, LogOut, Settings, Wine } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Sidebar({onLogout}) {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 w-full rounded-xl transition-colors duration-200 text-black hover:bg-gray-200 ${isActive ? "bg-white border-l-4 border-[var(--color-accent)]" : ""
        }`;

    return (
        <aside className="flex flex-col justify-between h-full text-xl font-regular mb-2 p-2 mt-2">
            <div>
                <h3 className="text-2xl mb-16">
                    <Wine size={32} className="inline-block mr-2 text-[var(--color-accent)]" />
                    WineMetrics
                </h3>
                <h4 className="text-base font-regular text-gray-400 mb-6">MENU</h4>

                <nav className="flex flex-col space-y-4">
                    <NavLink to="/" className={linkClasses}>
                        <LayoutDashboard size={18} className="text-[var(--color-accent)]" />
                        <span className="text-black">Overview</span>
                    </NavLink>

                    <NavLink to="/analytics" className={linkClasses}>
                        <BarChart3 size={18} className="text-[var(--color-accent)]" />
                        <span className="text-black">Analytics</span>
                    </NavLink>
                </nav>
            </div>

            <div>
                <h4 className="text-base font-regular text-gray-400 mb-6 ">GENERALI</h4>

                <nav className="flex flex-col space-y-4">
                    <NavLink to="/settings" className={linkClasses}>
                        <Settings size={18} className="text-[var(--color-accent)]" />
                        <span className="text-black">Impostazioni</span>
                    </NavLink>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 text-[var(--color-accent)] text-xl bg-transparent border-none outline-none hover:bg-gray-200 rounded-xl"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;