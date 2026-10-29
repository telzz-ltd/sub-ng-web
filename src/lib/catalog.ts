import type { NotificationItem, Transaction } from "@/lib/types";

export type Network = {
  id: string;
  name: string;
  short: string;
  background: string;
  foreground: string;
};

export const networks: Network[] = [
  {
    id: "mtn",
    name: "MTN",
    short: "MTN",
    background: "bg-yellow-50",
    foreground: "text-yellow-700",
  },
  {
    id: "airtel",
    name: "Airtel",
    short: "AIR",
    background: "bg-red-50",
    foreground: "text-red-700",
  },
  {
    id: "glo",
    name: "Glo",
    short: "GLO",
    background: "bg-green-50",
    foreground: "text-green-700",
  },
  {
    id: "9mobile",
    name: "9mobile",
    short: "9M",
    background: "bg-emerald-50",
    foreground: "text-emerald-700",
  },
];

export type DataPlan = {
  id: string;
  name: string;
  size: string;
  validity: string;
  price: number;
};

const mtnPlans: DataPlan[] = [
  { id: "mtn-1", name: "SME 1GB", size: "1GB", validity: "30 days", price: 1000 },
  { id: "mtn-2", name: "SME 2GB", size: "2GB", validity: "30 days", price: 2000 },
  { id: "mtn-3", name: "SME 3GB", size: "3GB", validity: "30 days", price: 2500 },
  { id: "mtn-5", name: "SME 5GB", size: "5GB", validity: "30 days", price: 4000 },
  { id: "mtn-10", name: "SME 10GB", size: "10GB", validity: "30 days", price: 6000 },
  { id: "mtn-20", name: "SME 20GB", size: "20GB", validity: "30 days", price: 10000 },
];

const airtelPlans: DataPlan[] = [
  { id: "air-1", name: "CG 1GB", size: "1GB", validity: "30 days", price: 1000 },
  { id: "air-2", name: "CG 2GB", size: "2GB", validity: "30 days", price: 2000 },
  { id: "air-3", name: "CG 3GB", size: "3GB", validity: "30 days", price: 2500 },
  { id: "air-5", name: "CG 5GB", size: "5GB", validity: "30 days", price: 4000 },
  { id: "air-10", name: "CG 10GB", size: "10GB", validity: "30 days", price: 6000 },
  { id: "air-20", name: "CG 20GB", size: "20GB", validity: "30 days", price: 10000 },
];

const gloPlans: DataPlan[] = [
  { id: "glo-1", name: "Gifting 1GB", size: "1GB", validity: "30 days", price: 900 },
  { id: "glo-2", name: "Gifting 2GB", size: "2GB", validity: "30 days", price: 1800 },
  { id: "glo-3", name: "Gifting 3GB", size: "3GB", validity: "30 days", price: 2400 },
  { id: "glo-5", name: "Gifting 5GB", size: "5GB", validity: "30 days", price: 3800 },
  { id: "glo-10", name: "Gifting 10GB", size: "10GB", validity: "30 days", price: 5800 },
  { id: "glo-20", name: "Gifting 20GB", size: "20GB", validity: "30 days", price: 9800 },
];

const nineMobilePlans: DataPlan[] = [
  { id: "9m-1", name: "Gifting 1GB", size: "1GB", validity: "30 days", price: 1000 },
  { id: "9m-2", name: "Gifting 2GB", size: "2GB", validity: "30 days", price: 2000 },
  { id: "9m-3", name: "Gifting 3GB", size: "3GB", validity: "30 days", price: 2600 },
  { id: "9m-5", name: "Gifting 5GB", size: "5GB", validity: "30 days", price: 4200 },
  { id: "9m-10", name: "Gifting 10GB", size: "10GB", validity: "30 days", price: 6500 },
  { id: "9m-20", name: "Gifting 20GB", size: "20GB", validity: "30 days", price: 11000 },
];

export const dataPlans: Record<string, DataPlan[]> = {
  mtn: mtnPlans,
  airtel: airtelPlans,
  glo: gloPlans,
  "9mobile": nineMobilePlans,
};

export type CableProvider = {
  id: string;
  name: string;
  background: string;
  foreground: string;
  plans: { id: string; name: string; price: number }[];
};

export const cableProviders: CableProvider[] = [
  {
    id: "dstv",
    name: "DStv",
    background: "bg-blue-50",
    foreground: "text-blue-700",
    plans: [
      { id: "dstv-padi", name: "Padi", price: 4400 },
      { id: "dstv-yanga", name: "Yanga", price: 6000 },
      { id: "dstv-confam", name: "Confam", price: 11000 },
      { id: "dstv-compact", name: "Compact", price: 19000 },
      { id: "dstv-premium", name: "Premium", price: 37000 },
    ],
  },
  {
    id: "gotv",
    name: "GOtv",
    background: "bg-emerald-50",
    foreground: "text-emerald-700",
    plans: [
      { id: "gotv-smallie", name: "Smallie", price: 1900 },
      { id: "gotv-jinja", name: "Jinja", price: 3900 },
      { id: "gotv-jolli", name: "Jolli", price: 5800 },
      { id: "gotv-max", name: "Max", price: 8500 },
      { id: "gotv-supa", name: "Supa", price: 12500 },
    ],
  },
  {
    id: "startimes",
    name: "StarTimes",
    background: "bg-orange-50",
    foreground: "text-orange-700",
    plans: [
      { id: "st-nova", name: "Nova", price: 1900 },
      { id: "st-basic", name: "Basic", price: 3700 },
      { id: "st-smart", name: "Smart", price: 4900 },
      { id: "st-classic", name: "Classic", price: 5900 },
      { id: "st-super", name: "Super", price: 9000 },
    ],
  },
];

export type ElectricityProvider = {
  id: string;
  name: string;
  short: string;
};

export const electricityProviders: ElectricityProvider[] = [
  { id: "ikeja", name: "Ikeja Electric", short: "IE" },
  { id: "eko", name: "Eko Electric", short: "EKEDC" },
  { id: "abuja", name: "Abuja Electric", short: "AEDC" },
  { id: "kano", name: "Kano Electric", short: "KEDCO" },
  { id: "ph", name: "Port Harcourt Electric", short: "PHED" },
  { id: "enugu", name: "Enugu Electric", short: "EEDC" },
  { id: "ibadan", name: "Ibadan Electric", short: "IBEDC" },
  { id: "jos", name: "Jos Electric", short: "JED" },
];

export type ExamProvider = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const examProviders: ExamProvider[] = [
  {
    id: "waec",
    name: "WAEC",
    description: "Result checker scratch card",
    price: 3500,
  },
  {
    id: "neco",
    name: "NECO",
    description: "Result token and PIN",
    price: 1500,
  },
  {
    id: "jamb",
    name: "JAMB",
    description: "UTME registration ePIN",
    price: 6500,
  },
  {
    id: "nabteb",
    name: "NABTEB",
    description: "Result checker PIN",
    price: 2500,
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    description: "Wallet Funding",
    reference: "TXN-100234",
    date: "Oct 28, 2026",
    amount: 20000,
    type: "credit",
    status: "Successful",
    category: "funding",
  },
  {
    id: "2",
    description: "MTN Data Bundle",
    reference: "TXN-100233",
    date: "Oct 28, 2026",
    amount: 2500,
    type: "debit",
    status: "Successful",
    category: "data",
  },
  {
    id: "3",
    description: "Airtime Purchase",
    reference: "TXN-100232",
    date: "Oct 27, 2026",
    amount: 1000,
    type: "debit",
    status: "Pending",
    category: "airtime",
  },
  {
    id: "4",
    description: "Commission",
    reference: "TXN-100231",
    date: "Oct 27, 2026",
    amount: 350,
    type: "credit",
    status: "Successful",
    category: "commission",
  },
  {
    id: "5",
    description: "Electricity Bill",
    reference: "TXN-100230",
    date: "Oct 26, 2026",
    amount: 5000,
    type: "debit",
    status: "Failed",
    category: "electricity",
  },
  {
    id: "6",
    description: "DStv Compact",
    reference: "TXN-100229",
    date: "Oct 25, 2026",
    amount: 19000,
    type: "debit",
    status: "Successful",
    category: "cable-tv",
  },
  {
    id: "7",
    description: "Airtel Data Bundle",
    reference: "TXN-100228",
    date: "Oct 24, 2026",
    amount: 4000,
    type: "debit",
    status: "Successful",
    category: "data",
  },
  {
    id: "8",
    description: "Wallet Funding",
    reference: "TXN-100227",
    date: "Oct 23, 2026",
    amount: 50000,
    type: "credit",
    status: "Successful",
    category: "funding",
  },
  {
    id: "9",
    description: "WAEC Result Checker",
    reference: "TXN-100226",
    date: "Oct 22, 2026",
    amount: 3500,
    type: "debit",
    status: "Successful",
    category: "exam",
  },
  {
    id: "10",
    description: "Glo Airtime",
    reference: "TXN-100225",
    date: "Oct 21, 2026",
    amount: 500,
    type: "debit",
    status: "Successful",
    category: "airtime",
  },
  {
    id: "11",
    description: "Commission",
    reference: "TXN-100224",
    date: "Oct 20, 2026",
    amount: 1200,
    type: "credit",
    status: "Successful",
    category: "commission",
  },
  {
    id: "12",
    description: "Ikeja Electric",
    reference: "TXN-100223",
    date: "Oct 19, 2026",
    amount: 15000,
    type: "debit",
    status: "Successful",
    category: "electricity",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Wallet funded successfully",
    description: "Your wallet has been credited with ₦5,000.00.",
    time: "5 min ago",
    category: "wallet",
    unread: true,
  },
  {
    id: "n2",
    title: "Data purchase successful",
    description: "Your 10GB MTN data bundle is now active.",
    time: "1 hour ago",
    category: "service",
    unread: true,
  },
  {
    id: "n3",
    title: "Commission credited",
    description: "You earned ₦350.00 from a recent transaction.",
    time: "3 hours ago",
    category: "wallet",
    unread: true,
  },
  {
    id: "n4",
    title: "Welcome to Subs.NG",
    description: "You can now buy airtime, data and pay bills.",
    time: "Yesterday",
    category: "system",
    unread: false,
  },
  {
    id: "n5",
    title: "Electricity token delivered",
    description: "Your prepaid token was sent to your email.",
    time: "2 days ago",
    category: "service",
    unread: false,
  },
  {
    id: "n6",
    title: "Security reminder",
    description: "Enable two-factor authentication for extra protection.",
    time: "3 days ago",
    category: "system",
    unread: false,
  },
];

export type CommissionEntry = {
  id: string;
  source: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
};

export const commissionHistory: CommissionEntry[] = [
  { id: "c1", source: "Data bundle sales", date: "Oct 28, 2026", amount: 1750, status: "Paid" },
  { id: "c2", source: "Airtime sales", date: "Oct 27, 2026", amount: 350, status: "Paid" },
  { id: "c3", source: "Cable TV subscription", date: "Oct 26, 2026", amount: 950, status: "Paid" },
  { id: "c4", source: "Electricity bill", date: "Oct 25, 2026", amount: 600, status: "Pending" },
  { id: "c5", source: "Exam card sales", date: "Oct 24, 2026", amount: 525, status: "Paid" },
  { id: "c6", source: "Data bundle sales", date: "Oct 22, 2026", amount: 1420, status: "Paid" },
];

export const banks = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "Kuda",
  "Moniepoint",
  "Opay",
  "PalmPay",
  "UBA",
  "Zenith Bank",
];

export const walletAccount = {
  name: "Subs.NG / Usman Muhammad",
  bank: "PalmPay",
  number: "9033456789",
};
