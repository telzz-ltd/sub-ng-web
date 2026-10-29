export type TransactionStatus = "Successful" | "Pending" | "Failed";

export type TransactionType = "credit" | "debit";

export type TransactionCategory =
  | "funding"
  | "airtime"
  | "data"
  | "electricity"
  | "cable-tv"
  | "exam"
  | "commission"
  | "other";

export type Transaction = {
  id: string;
  description: string;
  reference: string;
  date: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  category?: TransactionCategory;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: "wallet" | "service" | "system";
  unread: boolean;
};
