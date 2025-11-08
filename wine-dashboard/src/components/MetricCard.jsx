import Card from "./card/Card";

function MetricCard({
    title,
    value,
    valueColor,
    icon,
    unit,
    trend
}) {
    return (
        <Card title={title} icon={icon} className="w-full">
            <div className="flex flex-col text-center">
                <p className={`text-3xl font-bold ${valueColor ? valueColor : "text-[#722F37]"}`}>
                    {value} {unit && <span className="text-sm">{unit}</span>}
                </p>
                {trend && (
                    <p className={`text-xs mt-1 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
                        {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
                    </p>
                )}
            </div>
        </Card>
    )
}

export default MetricCard;