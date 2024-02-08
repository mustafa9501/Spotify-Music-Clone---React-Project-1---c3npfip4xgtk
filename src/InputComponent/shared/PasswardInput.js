const PasswordInput = ({ label, placeholder, className, value, setValue }) => {
  return (
    <div className={`flex flex-col space-y-3 w-full ${className}`}>
      <label for={label} className="text-white font-semibold">
        {label}
      </label>
      <input
        className="p-3 border border-gray-600 bg-black rounded hover:border-white text-white"
        type="password"
        placeholder={placeholder}
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default PasswordInput;
