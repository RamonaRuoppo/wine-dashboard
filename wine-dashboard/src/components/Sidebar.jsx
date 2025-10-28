import { BarChart3, LayoutDashboard, Settings, Wine } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 w-full rounded-xl transition-colors duration-200 text-black hover:bg-gray-200 ${
            isActive ? "bg-white border-l-4 border-[var(--color-accent)]" : ""
        }`;

    return (
        <aside className="text-xl font-regular mb-6 p-2 mt-2">
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

                <NavLink to="/settings" className={linkClasses}>
                    <Settings size={18} className="text-[var(--color-accent)]" />
                    <span className="text-black">Settings</span>
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;