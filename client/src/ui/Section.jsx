const Section = ({ children, className = "", bg = "white" }) => {
  const bgColors = {
    white: "bg-white",
    gray: "bg-gray-50",
  };

  const bgClass = bgColors[bg] || bgColors.white;

  return (
    <section className={`py-20 ${bgClass} ${className}`}>{children}</section>
  );
};

export default Section;
