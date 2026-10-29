
"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button, Flex, Typography } from "antd";
import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ReloadOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { formatAmount } from "@/lib/amount";
import { Naira } from "../ui/icons";

type WalletBalanceProps = {
  loading?: boolean;
  onRefresh: () => void;
  data?: {
    balance: number;
    commission: number;
    stats: { label: string; amount: number }[];
  };
};

export function WalletBalance({
  data,
  loading,
  onRefresh,
}: WalletBalanceProps) {
  const [hideBalance, setHideBalance] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const fmt = (amount = 0) => {
    if (loading) return "Loading...";
    return hideBalance ? "*****" : Naira + formatAmount(amount);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-accent-soft">
      <div className="rounded-2xl bg-accent px-4 py-4 text-accent-foreground md:px-5 md:py-5">
        <Flex align="center" gap={1}>
          <Typography.Text className="text-sm text-accent-foreground!">
            Account balance
          </Typography.Text>

          <Button
            type="text"
            size="small"
            aria-label={hideBalance ? "Show balance" : "Hide balance"}
            icon={hideBalance ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setHideBalance((value) => !value)}
            className="text-accent-foreground!"
          />

          <Button
            type="text"
            size="small"
            aria-label="Refresh balance"
            icon={<ReloadOutlined />}
            onClick={onRefresh}
            loading={loading}
            className="hidden text-accent-foreground! md:inline-flex"
          />

          <Link
            to="/"
            className="ml-auto flex items-center gap-1 text-sm text-primary hover:underline"
          >
            History <RightOutlined className="text-xs" />
          </Link>
        </Flex>

        <Typography.Title
          level={2}
          className="mb-0! mt-3! break-words text-3xl! font-semibold! leading-tight! text-accent-foreground! sm:text-4xl!"
        >
          {fmt(data?.balance)}
        </Typography.Title>
      </div>

      <div className="px-3">
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${breakdownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">
            <div
              className={`space-y-3 py-2 transition-opacity duration-200 ${breakdownOpen ? "opacity-100" : "opacity-0"
                }`}
            >
              <Flex align="center" gap={2} className="px-2">
                <Typography.Text className="w-28! md:w-30!">
                  Earnings
                </Typography.Text>

                <Typography.Text className="font-medium">
                  {fmt(data?.commission)}
                </Typography.Text>
              </Flex>

              <div>
                <Typography.Text className="px-2 text-xs text-muted">
                  Statistics
                </Typography.Text>

                <div className="mt-1">
                  {data?.stats.map((stat) => (
                    <Link
                      key={stat.label}
                      to="/"
                      className="flex items-center rounded-xl px-2 py-1.5 transition-colors hover:bg-background"
                    >
                      <Typography.Text className="w-28! md:w-30!">
                        {stat.label}
                      </Typography.Text>

                      <Typography.Text className="font-medium">
                        {fmt(stat.amount)}
                      </Typography.Text>

                      <RightOutlined className="ml-auto text-xs text-muted" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="text"
          block
          onClick={() => setBreakdownOpen((open) => !open)}
          className="flex! h-8! items-center! justify-center! gap-2! text-xs!"
        >
          {breakdownOpen ? "Hide breakdown" : "View breakdown"}
          <DownOutlined
            rotate={breakdownOpen ? 180 : 0}
            className="text-xs transition-transform duration-300"
          />
        </Button>
      </div>
    </div>
  );
}
