function CardBody({
    value,
    unit,
    color,
    historicValue,
    variation,
    diff,
    diffIcon,
    diffColor = "text-gray-600",
}) {
    return (
        <>
            <div className="text-3xl font-regular mb-2 mt-2" style={{ color }}>
                {value}
                {unit && <span className="text-sm ml-1 text-gray-600 dark:text-gray-200">{unit}</span>}
            </div>

            {diff && (
                <div className={`flex items-center gap-2 mb-1 text-sm ${diffColor}`}>
                    {(historicValue || variation) && (
                        <div className="flex items-center justify-between text-xs mb-1 mt-1">
                            {historicValue && (
                                <span className="text-sm text-gray-500 dark:text-gray-300">Media Storica: {historicValue}</span>
                            )}
                            {variation && (
                                <span className={`${variation > 0 ? "text-green-600" : "text-red-600"}`}>
                                    {variation > 0 ? "+" : ""}
                                    {variation.toFixed(1)}%
                                </span>
                            )}
                        </div>
                    )}
                    {diffIcon && diffIcon}
                    <span>{diff}</span>
                </div>
            )}
        </>
    );
}

export default CardBody;