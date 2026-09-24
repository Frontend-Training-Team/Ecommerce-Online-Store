const IconInput = ({ label, error, registration, Icon, ...props }) => {
  return (
    <div className="flex flex-col space-y-1.5 text-left w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-fg-secondary select-none">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative flex items-center group">
        <input
          {...registration}
          {...props}
          className={`w-full bg-white dark:bg-noir-750 border text-gray-800 dark:text-fg placeholder:text-gray-400 dark:placeholder:text-fg-placeholder py-2.5 rounded-lg text-sm transition-all duration-200 outline-none ${Icon ? 'pl-10 pr-4' : 'px-3.5'
            } ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-state-danger dark:focus:border-state-danger dark:focus:ring-state-danger/25'
              : 'border-gray-200 dark:border-line-control focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-copper-400 dark:focus:ring-copper-400/25 hover:border-gray-300 dark:hover:border-line-hover'
            } ${props.className || ''}`}
        />

        {/* Icon */}
        {Icon && (
          <div className="absolute left-3.5 flex items-center justify-center text-gray-400 dark:text-fg-tertiary pointer-events-none transition-colors group-focus-within:text-indigo-500 dark:group-focus-within:text-copper-400">
            {Icon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs font-medium text-red-500 dark:text-state-danger mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default IconInput;