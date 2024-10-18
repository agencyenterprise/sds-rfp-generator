import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

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
  <div className="my-auto flex min-h-[40px] w-[318px] min-w-[240px] items-center self-stretch rounded-lg border border-solid border-slate-700 bg-slate-800 py-1.5 py-3 pl-3 pr-1.5 text-xs text-slate-500 shadow-sm">
    <div className="my-auto flex items-center gap-1 self-stretch">
      <MagnifyingGlassIcon className="size-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none bg-transparent text-slate-500 outline-none"
      />
    </div>
  </div>
);

export default SearchBar;
