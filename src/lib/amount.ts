import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";

const group = (int: string) => int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function sanitizeAmount(input: string, maxDecimals = 2) {
  let cleaned = input.replace(/[^\d.]/g, "");

  if (maxDecimals <= 0) {
    cleaned = cleaned.replace(/\./g, "");
  } else {
    const dot = cleaned.indexOf(".");

    if (dot !== -1) {
      cleaned =
        cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, "");
    }
  }

  const startsWithDot = cleaned.startsWith(".");

  let [int = "", dec] = cleaned.split(".");

  int = int.replace(/^0+(?=\d)/, "");

  if (startsWithDot) {
    int = "0";
  }

  dec = dec?.slice(0, maxDecimals);

  return {
    display: dec !== undefined ? `${group(int)}.${dec}` : group(int),

    value: cleaned === "" ? 0 : parseFloat(`${int || "0"}.${dec ?? "0"}`),
  };
}

export const formatAmount = (n: number | null | undefined, maxDecimals = 2) =>
  n != null && !isNaN(n) && n !== 0
    ? sanitizeAmount(String(n), maxDecimals).display
    : "";

export type AmountProps = Omit<
  ComponentProps<"input">,
  "value" | "onChange" | "type"
> & {
  value?: number | null;
  onChange?: (value: number) => void;
  maxDecimals?: number;
};

export function useAmountInputProps({
  value,
  onChange,
  onBlur,
  maxDecimals = 2,
  ...rest
}: AmountProps = {}): ComponentProps<"input"> {
  const [inputValue, setInputValue] = useState(() =>
    formatAmount(value, maxDecimals),
  );

  const lastExternalValue = useRef(value);

  useEffect(() => {
    if (value !== lastExternalValue.current) {
      lastExternalValue.current = value;
      setInputValue(formatAmount(value, maxDecimals));
    }
  }, [value, maxDecimals]);

  return {
    ...rest,

    type: "text",
    inputMode: maxDecimals > 0 ? "decimal" : "numeric",
    autoComplete: "off",

    value: inputValue,

    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const el = e.target;
      const caret = el.selectionStart ?? el.value.length;

      const meaningful = el.value.slice(0, caret).replace(/[^\d.]/g, "").length;

      const next = sanitizeAmount(el.value, maxDecimals);

      // Keep the string locally.
      // This allows "100." to exist even though
      // the external value is still the number 100.
      setInputValue(next.display);

      onChange?.(next.value);

      let count = 0;
      let pos = 0;

      while (pos < next.display.length && count < meaningful) {
        if (/[\d.]/.test(next.display[pos])) {
          count++;
        }

        pos++;
      }

      queueMicrotask(() => {
        if (document.activeElement === el) {
          el.setSelectionRange(pos, pos);
        }
      });
    },

    onBlur: (e) => {
      const normalized = sanitizeAmount(inputValue, maxDecimals);

      setInputValue(
        normalized.value === 0
          ? ""
          : formatAmount(normalized.value, maxDecimals),
      );

      onBlur?.(e);
    },
  };
}
