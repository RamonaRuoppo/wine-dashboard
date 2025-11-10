function Card({
  title,
  icon,
  footer,
  children,
  infoText,
  variant = "default",
  className,
  ...props
}) {
  const variants = {
    default: "bg-white border-gray-200 text-gray-900",
    dark: "bg-[#722F37] text-white border-transparent",
    subtle: "bg-gray-50 border-gray-100 text-gray-700",
  };

  return (
    <div
      data-slot="card"
      className={`
        flex flex-col 
        rounded-2xl border shadow-sm 
        transition-all duration-300 
        hover:shadow-md hover:-translate-y-1 
        p-4
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon && <div>{icon}</div>}
            {title && <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h3>}
          </div>
          {infoText && (
            <div className="relative inline-block group">
              <Info size={12} className="cursor-pointer text-gray-500" />
              <div className="absolute bottom-full right-0 transform translate-y-[-4px] w-48 text-xs text-white bg-[#530711e2] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {infoText}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-3 pt-2 border-t">{footer}</div>}
    </div>
  );
}

export default Card;