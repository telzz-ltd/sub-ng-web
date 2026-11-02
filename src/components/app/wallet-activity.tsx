
import {
    ArrowDown01Icon,
    ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";

type Period = "7 days" | "30 days" | "12 months";

const periods: Period[] = ["7 days", "30 days", "12 months"];

const activity: Record<Period, { label: string; amount: number }[]> = {
    "7 days": [
        { label: "Mon", amount: 12500 },
        { label: "Tue", amount: 8200 },
        { label: "Wed", amount: 21400 },
        { label: "Thu", amount: 15800 },
        { label: "Fri", amount: 28600 },
        { label: "Sat", amount: 19200 },
        { label: "Sun", amount: 34200 },
    ],
    "30 days": [
        { label: "Week 1", amount: 85000 },
        { label: "Week 2", amount: 112000 },
        { label: "Week 3", amount: 96000 },
        { label: "Week 4", amount: 148000 },
    ],
    "12 months": [
        { label: "May", amount: 320000 },
        { label: "Jun", amount: 410000 },
        { label: "Jul", amount: 365000 },
        { label: "Aug", amount: 520000 },
        { label: "Sep", amount: 470000 },
        { label: "Oct", amount: 610000 },
    ],
};

const chartConfig = {
    amount: {
        label: "Volume",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

const formatAxisValue = (value: number) =>
    value >= 1000
        ? `₦${Math.round(value / 1000)}k`
        : `₦${value}`;

export function WalletActivity() {
    const [period, setPeriod] = useState<Period>("7 days");

    const data = activity[period];

    const total = data.reduce(
        (sum, item) => sum + item.amount,
        0,
    );

    const previousTotal = total * 0.82;
    const change = ((total - previousTotal) / previousTotal) * 100;

    return (
        <Card className="h-full rounded-2xl">
            <CardContent className="p-5">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Wallet activity
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <h3 className="text-2xl font-bold tracking-tight">
                                {formatNaira(total)}
                            </h3>

                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                <HugeiconsIcon
                                    icon={ArrowUp01Icon}
                                    className="size-3.5"
                                />
                                {change.toFixed(1)}%
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Total transaction volume
                        </p>
                    </div>

                    {/* Period selector */}
                    <Select
                        value={period}
                        onValueChange={(value) => {
                            if (value) setPeriod(value as Period);
                        }}
                    >
                        <SelectTrigger className="h-8 w-31.25 text-xs">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {periods.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Chart */}
                <div className="mt-5">
                    <ChartContainer
                        config={chartConfig}
                        className="h-55 w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 12,
                                right: 8,
                                bottom: 0,
                                left: 8,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 4"
                                className="stroke-border"
                            />

                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={12}
                                fontSize={11}
                                className="fill-muted-foreground"
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                width={48}
                                fontSize={10}
                                tickFormatter={formatAxisValue}
                                className="fill-muted-foreground"
                            />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => (
                                            <span className="font-medium">
                                                {formatNaira(Number(value))}
                                            </span>
                                        )}
                                    />
                                }
                            />

                            <Line
                                dataKey="amount"
                                type="monotone"
                                stroke="var(--color-amount)"
                                strokeWidth={2.5}
                                dot={{
                                    r: 3,
                                    fill: "var(--color-amount)",
                                    stroke: "var(--background)",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 5,
                                    strokeWidth: 2,
                                }}
                                animationDuration={400}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>

                {/* Footer */}
                <div className="mt-2 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className="size-3.5 text-muted-foreground"
                        />

                        <span className="text-xs text-muted-foreground">
                            {period === "7 days"
                                ? "Daily activity"
                                : period === "30 days"
                                    ? "Weekly activity"
                                    : "Monthly activity"}
                        </span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                        {data.length} data points
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
