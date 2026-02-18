const Card = ({ children, className = "", hover = false }) => {
  const hoverClass = hover
    ? "hover:shadow-lg transition-shadow duration-300"
    : "";

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
