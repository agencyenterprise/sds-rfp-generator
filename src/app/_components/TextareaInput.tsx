import React from "react";

interface TextareaInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  id,
  value,
  onChange,
  onKeyDown,
  inputRef,
}) => (
  <textarea
    key={id}
    ref={inputRef}
    name={id}
    rows={3}
    className="w-full resize-none rounded-lg border border-gray-300 bg-white p-4 text-xl text-gray-800 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 dark:focus:ring-purple-800"
    value={value || ""}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder="Type your answer here..."
  />
);

export default TextareaInput;
