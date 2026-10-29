import type { ReactNode } from "react";

export type SelectionOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
};

type SelectionGridProps = {
  value?: string;
  options: SelectionOption[];
  onChange?: (value: string) => void;
  columns?: 2 | 3;
};

export function SelectionGrid({
  value,
  options,
  onChange,
  columns = 2,
}: SelectionGridProps) {
  const gridClass =
    columns === 3
      ? "grid grid-cols-2 gap-2 sm:grid-cols-3"
      : "grid grid-cols-2 gap-2";

  return (
    <div className={gridClass}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            aria-pressed={selected}
            onClick={() => onChange?.(option.value)}
            className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition ${
              selected
                ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            } ${option.disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {option.leading}

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-gray-900">
                {option.label}
              </span>
              {option.description && (
                <span className="block truncate text-xs text-gray-500">
                  {option.description}
                </span>
              )}
            </span>

            {option.trailing}
          </button>
        );
      })}
    </div>
  );
}
