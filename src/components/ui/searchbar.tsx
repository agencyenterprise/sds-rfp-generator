import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { Input } from "./input";

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  placeholder = "Search...",
  onChange,
}: SearchBarProps) => (
  <div className="flex w-full max-w-md items-center rounded-lg border dark:bg-[#141828]">
    <div className="flex w-full items-center">
      <MagnifyingGlassIcon className="ml-2.5 size-5 text-slate-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  </div>
);

export default SearchBar;
