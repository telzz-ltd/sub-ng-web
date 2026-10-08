"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ButtonLink } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  EyeOffIcon,
  Refresh01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

export function WalletBalance({ stats }: { stats: any[] }) {
  const [hideBalance, setHideBalance] = useState(false);

  const formatAmount = (amount: number) => {
    return formatCurrency(amount, { hidden: hideBalance });
  };

  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden border">
      <div className="bg-white px-4 py-3 rounded-2xl">
        <div className="flex items-center gap-2 md:gap-1 mb-2">
          <Label>Account Balance</Label>
          <HugeiconsIcon
            icon={EyeOffIcon}
            size={16}
            strokeWidth={2}
            onClick={() => setHideBalance(!hideBalance)}
            className="cursor-pointer hover:bg-gray-100 size-4 md:size-6 md:not-only:p-1 rounded-full"
          />
          <HugeiconsIcon
            icon={Refresh01Icon}
            size={16}
            strokeWidth={2}
            className="cursor-pointer hover:bg-gray-100 hidden md:inline md:size-6 md:p-1 rounded-full"
          />
          <Link
            href="/"
            className="text-sm ml-auto text-primary flex items-center hover:underline"
          >
            <span>History</span>
            <HugeiconsIcon icon={ChevronRight} size={16} strokeWidth={2} />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-h3">{formatAmount(260000000)}</h3>
          <ButtonLink
            size="sm"
            className="h-6 md:h-7 text-primary border-primary"
            variant="outline"
            href="/app/fund-wallet"
          >
            {/* <HugeiconsIcon icon={PlusIcon} /> */}
            Fund Wallet
          </ButtonLink>
        </div>
      </div>
      <Collapsible className="group">
        <CollapsibleContent>
          <div className="px-2 py-3">
            <Link href="/" className="flex items-center py-1 px-2">
              <h6 className="w-30 font-normal text-sm">Earnings</h6>
              <h5 className="font-normal">{formatAmount(260000)}</h5>
              <Button
                className="ml-auto h-6 text-xs"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                Withdraw
              </Button>
            </Link>
            <Separator className="my-3 border-dashed" />
            <div>
              <Label className="text-xs text-muted-foreground px-2">
                Statistics
              </Label>
              {stats.map((stat, index) => (
                <Link
                  href="/"
                  className="flex py-1 items-start hover:bg-white px-2 rounded-2xl"
                  key={index}
                >
                  <h6 className="w-30 font-normal text-sm">{stat.label}</h6>
                  <h6 className="font-normal">{formatAmount(stat.amount)}</h6>
                  <HugeiconsIcon
                    icon={ChevronRight}
                    size={18}
                    className="ml-auto"
                  />
                </Link>
              ))}
            </div>
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger className="px-3 py-1 bg-gray-50 w-full flex items-center justify-center gap-2">
          <span className="text-xs transition-all duration-300 group-data-open:hidden">
            View Breakdown
          </span>
          <HugeiconsIcon
            icon={ChevronDown}
            size={17}
            strokeWidth={2}
            className="transition-transform duration-150 group-data-open:rotate-180"
          />
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}
