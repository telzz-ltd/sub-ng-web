"use client";
import { AppLayout } from "@/components/app/layout";
import { WalletBalance } from "@/components/app/wallet-balance";
import { Label } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BsCardHeading, BsCash } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { ImConnection } from "react-icons/im";
import { MdConnectedTv, MdPhonelinkRing } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbCashBanknote } from "react-icons/tb";

const quickLinks = [
  { label: "Airtime", href: "#", icon: MdPhonelinkRing },
  { label: "Data", href: "#", icon: ImConnection },
  {
    label: "Airtime 2 Cash",
    href: "#",
    icon: TbCashBanknote,
  },
  {
    label: "Recharge Card",
    href: "#",
    icon: BsCash,
  },
  { label: "Electricity", href: "#", icon: HiOutlineLightBulb },
  { label: "Exam Card", href: "#", icon: BsCardHeading },
  { label: "Cable TV", href: "#", icon: MdConnectedTv },
  { label: "More", href: "#", icon: RxDashboard },
];

export default function Page() {
  const { data, refetch, isFetching } = useQuery({
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 2000));
      return {
        balance: Math.random() * 9999999999,
        commission: Math.random() * 99999999,
        stats: [
          { label: "Airtime", amount: Math.random() * 9999999 },
          { label: "Data Bundles", amount: Math.random() * 9999999 },
          { label: "Exam Cards", amount: Math.random() * 99999999 },
          { label: "Cable TV", amount: Math.random() * 999999 },
        ],
      };
    },
    queryKey: ["app-dashboard"],
  });
  return (
    <AppLayout
      title="Dashboard"
      description="View insight on your activities"
      onRefresh={refetch as any}
    >
      <WalletBalance data={data} loading={isFetching} />
      <div className="space-y-3">
        <h4 className="text-h6">Quick Links</h4>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {quickLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="bg-white inline-flex flex-col gap-2 items-center py-3 rounded-xl hover:bg-primary/5 border"
            >
              <link.icon className="size-8 md:size-12" />
              <Label className="text-xs md:text-sm">{link.label}</Label>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
