function CardFooter({
    progress,
    badgeText,
    badgeColor = "text-gray-600",
    badgeBg = "bg-gray-100",
    badgeBorder = "border-gray-300",
}) {
    return (
        <>
            {badgeText && (
                <span
                    className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full border ${badgeColor} ${badgeBg} ${badgeBorder}`}
                >
                    {badgeText}
                </span>
            )}

            {progress !== undefined && (
                <hr className="border-t border-gray-200 dark:border-gray-700 my-4" />
            )}

            {progress !== undefined && (
                <div className="flex flex-col justify-between gap-1 mt-2" >
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-300 mb-1 w-full">Avanzamento Accumulo Termico:</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-white">{Math.min(progress, 100)}%</span>
                    </div>
                    <progress value={progress} max="100" className="progress-bar w-full" />
                </div>
            )}
        </>
    );
}

export default CardFooter;