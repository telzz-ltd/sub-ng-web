export function BrandBadge({
  label,
  className = "bg-gray-100 text-gray-600",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold tracking-tight ${className}`}
    >
      {label}
    </span>
  );
}
