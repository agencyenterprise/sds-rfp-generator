import React from "react";

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  inputRef: React.RefObject<HTMLSelectElement>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  options,
  inputRef,
}) => (
  <select
    name={id}
    ref={inputRef}
    className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-4 text-xl text-gray-800 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-800"
    value={value || ""}
    onChange={onChange}
  >
    <option value="" disabled className="text-gray-500 dark:text-gray-400">
      Select an option
    </option>
    {options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        className="text-gray-800 dark:text-white"
      >
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectInput;
