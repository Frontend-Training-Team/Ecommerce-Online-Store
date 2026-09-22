const IconInput = ({ label, error, registration, Icon, ...props }) => {
  return (
    <div className="flex flex-col space-y-1.5 text-left w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative flex items-center group">
        <input
          {...registration}
          {...props}
          className={`w-full bg-white dark:bg-[#1F232B] border text-gray-800 dark:text-[#F5F1EA] placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2.5 rounded-lg text-sm transition-all duration-200 outline-none ${Icon ? 'pl-10 pr-4' : 'px-3.5'
            } ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-gray-300 dark:hover:border-gray-600'
            } ${props.className || ''}`}
        />

        {/* Icon */}
        {Icon && (
          <div className="absolute left-3.5 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none transition-colors group-focus-within:text-indigo-500">
            {Icon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default IconInput;