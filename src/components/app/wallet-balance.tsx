"use client";

import { ButtonLink } from "@/components/ui/link";
import { formatAmount } from "@/lib/amount";
import { Button, Disclosure, Label, Separator, Surface } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { Naira } from "../ui/icons";

export function WalletBalance({
  data,
  loading,
}: {
  loading?: boolean;
  data?: {
    balance: number;
    commission: number;
    stats: { label: string; amount: number }[];
  };
}) {
  const [hideBalance, setHideBalance] = useState(false);

  const fmt = (amount: number = 0) => {
    if (loading) return "loading...";
    return hideBalance ? "*****" : Naira + formatAmount(amount);
  };

  return (
    <Surface className="bg-accent-soft rounded-2xl overflow-hidden shadow">
      <Disclosure.Heading className="bg-accent px-4 py-2 md:py-4 rounded-2xl md:space-y-2">
        <div className="flex items-center text-accent-foreground">
          <Label className="text-accent-foreground">Account Balance</Label>
          <Button
            isIconOnly
            size="sm"
            onClick={() => setHideBalance(!hideBalance)}
          >
            <FaRegEyeSlash className="size-5" />
          </Button>
          <Button isIconOnly size="sm" className="hidden md:inline-flex">
            <IoMdRefresh className="size-5" />
          </Button>
          <Link
            href="/"
            className="text-sm ml-auto text-primary flex items-center hover:underline"
          >
            <span>History</span>
            <FaAngleRight />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-accent-foreground text-2xl md:text-3xl font-semibold">
            {fmt(data?.balance)}
          </h2>
          <ButtonLink
            size="sm"
            className="h-6 md:h-7 text-accent-foreground border-accent-foreground"
            variant="outline"
            href="/app/fund-wallet"
          >
            Fund Wallet
          </ButtonLink>
        </div>
      </Disclosure.Heading>
      <Disclosure className="group">
        <Disclosure.Content>
          <Disclosure.Body className="md:px-2 py-3">
            <Link href="/" className="flex items-center py-1 px-2">
              <Label className="w-28 md:w-30">Earnings</Label>
              <h5 className="font-normal">{fmt(data?.commission)}</h5>
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
            <Separator variant="tertiary" className="my-3" />
            <div>
              <Label className="text-xs text-muted-foreground px-2">
                Statistics
              </Label>
              {data?.stats.map((stat, index) => (
                <Link
                  href="/"
                  className="flex py-1 items-center hover:bg-white px-2 rounded-2xl"
                  key={index}
                >
                  <Label className="w-28 md:w-30">{stat.label}</Label>
                  <h6 className="font-normal">{fmt(stat.amount)}</h6>
                  <FaAngleRight size={18} className="ml-auto" />
                </Link>
              ))}
            </div>
          </Disclosure.Body>
        </Disclosure.Content>
        <Disclosure.Trigger className="px-3 py-1 w-full flex items-center justify-center gap-2">
          <span className="text-xs transition-all duration-300 group-data-expanded:hidden">
            View Breakdown
          </span>
          <FaAngleDown
            size={17}
            strokeWidth={2}
            className="transition-transform duration-150 group-data-expanded:rotate-180"
          />
        </Disclosure.Trigger>
      </Disclosure>
    </Surface>
  );
}
