function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={`
        bg-white 
        text-gray-900 
        flex flex-col gap-4 
        rounded-2xl 
        border border-gray-200 
        shadow-sm 
        hover:shadow-md 
        transition-all 
        duration-300 
        hover:-translate-y-1 
        ${className}
      `}
      {...props}
    />
  );
}

export default Card;