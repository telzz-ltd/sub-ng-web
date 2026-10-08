import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { WalletBalance } from "./components/wallet-balance";

const stats = [
  { label: "Airtime", amount: 20000 },
  { label: "Data Bundles", amount: 20000 },
  { label: "Exam Cards", amount: 20000 },
  { label: "Cable TV", amount: 20000 },
];

const quickLinks = [
  { label: "Airtime", href: "#", icon: "flat-color-icons:missed-call" },
  { label: "Data", href: "#", icon: "carbon:data-vis-1" },
  {
    label: "Airtime 2 Cash",
    href: "#",
    icon: "fluent-emoji-flat:money-with-wings",
  },
  {
    label: "Recharge Card",
    href: "#",
    icon: "streamline-freehand-color:credit-card-smartphone",
  },
  { label: "Electricity", href: "#", icon: "emojione-v1:light-bulb" },
  { label: "Exam Card", href: "#", icon: "ph:exam-fill" },
  { label: "Cable TV", href: "#", icon: "streamline-color:live-video-flat" },
  { label: "More", href: "#", icon: "hugeicons:dashboard-square-add" },
];

export default function Page() {
  return (
    <div className="space-y-5">
      <WalletBalance stats={stats} />
      <div className="space-y-3">
        <h4 className="text-h6">Quick Links</h4>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {quickLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="bg-white inline-flex flex-col gap-2 items-center py-3 rounded-xl hover:bg-primary/5 border"
            >
              <Icon icon={link.icon} className="size-8 md:size-12" />
              <Label className="text-xs md:text-sm">{link.label}</Label>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
