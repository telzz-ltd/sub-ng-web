"use client";

import { ButtonLink } from "@/components/ui/link";
import { formatCurrency } from "@/lib/utils";
import {
  Button,
  Disclosure,
  Label,
  Separator,
  Surface,
  Typography,
} from "@heroui/react";
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
    <Surface className="bg-accent-soft rounded-2xl overflow-hidden shadow">
      <Disclosure.Heading className="bg-accent p-4">
        <div className="flex items-center gap-2 md:gap-1 mb-2 text-accent-foreground">
          <Label className="text-accent-foreground">Account Balance</Label>
          <HugeiconsIcon
            icon={EyeOffIcon}
            size={16}
            strokeWidth={2}
            onClick={() => setHideBalance(!hideBalance)}
            className="cursor-pointer hover:bg-accent-hover size-4 md:size-6 md:not-only:p-1 rounded-full"
          />
          <HugeiconsIcon
            icon={Refresh01Icon}
            size={16}
            strokeWidth={2}
            className="cursor-pointer hover:bg-accent-hover hidden md:inline md:size-6 md:p-1 rounded-full"
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
          <Typography.Heading className="text-accent-foreground font-black">
            {formatAmount(260000000)}
          </Typography.Heading>
          <ButtonLink
            size="sm"
            className="h-6 md:h-7 text-accent-foreground border-accent-foreground"
            variant="outline"
            href="/app/fund-wallet"
          >
            {/* <HugeiconsIcon icon={PlusIcon} /> */}
            Fund Wallet
          </ButtonLink>
        </div>
      </Disclosure.Heading>
      <Disclosure className="group">
        <Disclosure.Content>
          <Disclosure.Body className="px-2 py-3">
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
          </Disclosure.Body>
        </Disclosure.Content>
        <Disclosure.Trigger className="px-3 py-1 w-full flex items-center justify-center gap-2">
          <span className="text-xs transition-all duration-300 group-data-expanded:hidden">
            View Breakdown
          </span>
          <HugeiconsIcon
            icon={ChevronDown}
            size={17}
            strokeWidth={2}
            className="transition-transform duration-150 group-data-expanded:rotate-180"
          />
        </Disclosure.Trigger>
      </Disclosure>
    </Surface>
  );
}
