import { FieldErrors } from "react-hook-form";

export function formatCurrency(
  amount: number,
  opt: { currency?: string; locale?: string; hidden?: boolean } = {
    currency: "NGN",
    locale: "en-NG",
    hidden: false,
  },
): string {
  if (opt.hidden) {
    return "*****";
  }

  return new Intl.NumberFormat(opt.locale, {
    style: "decimal",
    currency: opt.currency ?? "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatFormErrors(errors: FieldErrors): Record<string, string> {
  const result: Record<string, string> = {};

  const traverse = (obj: FieldErrors, path = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (!value) continue;

      if (typeof value === "object" && "message" in value && value.message) {
        result[currentPath] = String(value.message);
        continue;
      }

      if (typeof value === "object") {
        traverse(value as FieldErrors, currentPath);
      }
    }
  };

  traverse(errors);

  return result;
}
