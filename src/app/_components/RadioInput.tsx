import React from "react";

interface RadioInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Array<{ value: string; label: string }>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  inputRef,
}) => (
  <div id={id} className="space-y-4">
    {options.map((option) => (
      <div
        key={option.value}
        className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-colors ${
          value === option.value
            ? "border-purple-600 bg-purple-100 dark:border-purple-400 dark:bg-purple-900"
            : "border-gray-300 bg-white hover:border-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-purple-500"
        }`}
      >
        <input
          type="radio"
          id={option.value}
          ref={inputRef}
          name={name}
          value={option.value}
          className="hidden"
          checked={value === option.value}
          onChange={onChange}
        />
        <label
          htmlFor={option.value}
          className={`w-full cursor-pointer text-xl ${
            value === option.value
              ? "font-bold text-purple-800 dark:text-purple-200"
              : "text-gray-700 dark:text-gray-200"
          }`}
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
);

export default RadioInput;
