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
                <hr className="border-t border-gray-200 my-4" />
            )}

            {progress !== undefined && (
                <div className="flex flex-col items-center gap-1 mb-4 mt-2" >
                    <p className="text-xs text-gray-500 mb-1 w-full">Avanzamento Accumulo Termico:</p>
                    <progress value={progress} max="100" className="progress-bar w-full" />
                    <p className="text-xs text-gray-500 mb-1">{Math.min(progress, 100)}%</p>
                </div>
            )}
        </>
    );
}

export default CardFooter;