import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  CreditCardIcon,
  DollarCircleIcon,
  FileTextIcon,
  PlayCircleIcon,
  BookOpen01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

import type {
  TransactionCategory,
  TransactionStatus,
} from "@/lib/types";

const categoryStyles: Record<
  TransactionCategory,
  {
    icon: typeof ZapIcon;
    className: string;
  }
> = {
  funding: {
    icon: ArrowDown01Icon,
    className: "bg-emerald-50 text-emerald-700",
  },
  airtime: {
    icon: CreditCardIcon,
    className: "bg-blue-50 text-blue-700",
  },
  data: {
    icon: ZapIcon,
    className: "bg-violet-50 text-violet-700",
  },
  electricity: {
    icon: ZapIcon,
    className: "bg-amber-50 text-amber-700",
  },
  "cable-tv": {
    icon: PlayCircleIcon,
    className: "bg-cyan-50 text-cyan-700",
  },
  exam: {
    icon: BookOpen01Icon,
    className: "bg-pink-50 text-pink-700",
  },
  commission: {
    icon: DollarCircleIcon,
    className: "bg-lime-50 text-lime-700",
  },
  other: {
    icon: FileTextIcon,
    className: "bg-gray-100 text-gray-600",
  },
};

export function TransactionIcon({
  category = "other",
}: {
  category?: TransactionCategory;
}) {
  const { icon, className } = categoryStyles[category];

  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${className}`}
    >
      <HugeiconsIcon icon={icon} className="size-5" />
    </div>
  );
}

const statusStyles: Record<TransactionStatus, string> = {
  Successful: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
};

const statusDots: Record<TransactionStatus, string> = {
  Successful: "bg-emerald-500",
  Pending: "bg-amber-500",
  Failed: "bg-red-500",
};

export function TransactionStatusBadge({
  status,
}: {
  status: TransactionStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className={`size-1.5 rounded-full ${statusDots[status]}`} />
      {status}
    </span>
  );
}