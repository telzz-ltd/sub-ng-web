export function formatNaira(amount: number, decimals = 2) {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatCompactNaira(amount: number) {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
  }

  if (amount >= 1_000) {
    return `₦${Math.round(amount / 1_000)}k`;
  }

  return `₦${amount}`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-NG");
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 4) return digits;

  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}

export function isValidNgPhone(value: string) {
  return /^0[789][01]\d{8}$/.test(value.replace(/\s/g, ""));
}
