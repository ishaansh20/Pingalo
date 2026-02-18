import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-gray-900 hover:bg-black text-white shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow disabled:bg-gray-100 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
