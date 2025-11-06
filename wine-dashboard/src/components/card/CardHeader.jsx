import { Info } from "lucide-react";

function CardHeader({
    title,
    subtitle,
    icon,
    info
}) {
    return (
        <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm text-gray-600">{title}</h3>
                    {info && (
                        <div className="relative inline-block group">
                            <Info size={12} className="cursor-pointer text-gray-500" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 text-xs text-white bg-[#530711e2] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {info}
                            </div>
                        </div>
                    )}
                </div>
                {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
            {icon && <div className="text-gray-600">{icon}</div>}
        </div>
    );
}

export default CardHeader;