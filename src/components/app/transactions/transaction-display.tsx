import {
  ArrowDownOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import type {
  TransactionCategory,
  TransactionStatus,
} from "@/lib/types";

const categoryStyles: Record<
  TransactionCategory,
  { icon: typeof ThunderboltOutlined; className: string }
> = {
  funding: {
    icon: ArrowDownOutlined,
    className: "bg-emerald-50 text-emerald-700",
  },
  airtime: {
    icon: CreditCardOutlined,
    className: "bg-blue-50 text-blue-700",
  },
  data: {
    icon: ThunderboltOutlined,
    className: "bg-violet-50 text-violet-700",
  },
  electricity: {
    icon: ThunderboltOutlined,
    className: "bg-amber-50 text-amber-700",
  },
  "cable-tv": {
    icon: PlayCircleOutlined,
    className: "bg-cyan-50 text-cyan-700",
  },
  exam: {
    icon: ReadOutlined,
    className: "bg-pink-50 text-pink-700",
  },
  commission: {
    icon: DollarOutlined,
    className: "bg-lime-50 text-lime-700",
  },
  other: {
    icon: FileTextOutlined,
    className: "bg-gray-100 text-gray-600",
  },
};

export function TransactionIcon({
  category = "other",
}: {
  category?: TransactionCategory;
}) {
  const style = categoryStyles[category];
  const Icon = style.icon;

  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-base ${style.className}`}
    >
      <Icon />
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
