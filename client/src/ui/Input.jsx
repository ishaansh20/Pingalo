const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  error = "",
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
};

export default Input;
