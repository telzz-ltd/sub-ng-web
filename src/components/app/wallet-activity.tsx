
import { Line } from "@ant-design/plots";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Segmented, Space, Typography } from "antd";
import { useState } from "react";

const { Text, Title } = Typography;

type Period = "7 days" | "30 days" | "12 months";

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

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

export function WalletActivity() {
    const [period, setPeriod] = useState<Period>("7 days");
    const data = activity[period];
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const previousTotal = total * 0.82;
    const change = ((total - previousTotal) / previousTotal) * 100;

    return (
        <Card
            className="h-full rounded-2xl border-gray-200"
            styles={{ body: { padding: 20 } }}
        >
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <Text type="secondary" className="text-sm">
                        Wallet activity
                    </Text>

                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                        <Title level={3} className="mb-0!">
                            {formatNaira(total)}
                        </Title>

                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            <ArrowUpOutlined />
                            {change.toFixed(1)}%
                        </span>
                    </div>

                    <Text type="secondary" className="mt-1 block text-xs">
                        Total transaction volume
                    </Text>
                </div>

                <Segmented
                    size="small"
                    value={period}
                    options={["7 days", "30 days", "12 months"]}
                    onChange={(value) => setPeriod(value as Period)}
                />
            </div>

            <div className="mt-5">
                <Line
                    data={data}
                    xField="label"
                    yField="amount"
                    height={220}
                    smooth
                    animate
                    padding={[12, 8, 28, 8]}
                    scale={{
                        y: { nice: true },
                    }}
                    style={{
                        stroke: "#2563eb",
                        lineWidth: 2.5,
                    }}
                    point={{
                        shape: "circle",
                        size: 3,
                        style: {
                            fill: "#2563eb",
                            stroke: "#ffffff",
                            lineWidth: 2,
                        },
                    }}
                    axis={{
                        x: {
                            title: false,
                            tick: false,
                            line: false,
                            labelFontSize: 11,
                            labelFill: "#8c8c8c",
                        },
                        y: {
                            title: false,
                            tick: false,
                            line: false,
                            grid: true,
                            gridLineDash: [3, 4],
                            gridStroke: "#f0f0f0",
                            labelFontSize: 10,
                            labelFill: "#8c8c8c",
                            labelFormatter: (value: string) => {
                                const amount = Number(value);
                                return amount >= 1000
                                    ? `₦${Math.round(amount / 1000)}k`
                                    : `₦${amount}`;
                            },
                        },
                    }}
                    tooltip={{
                        title: (datum: { label: string }) => datum.label,
                        items: [
                            {
                                channel: "y",
                                name: "Volume",
                                valueFormatter: (value: number) => formatNaira(value),
                            },
                        ],
                    }}
                />
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4">
                <Space size={2}>
                    <ArrowDownOutlined className="text-xs text-gray-400" />
                    <Text type="secondary" className="text-xs">
                        {period === "7 days"
                            ? "Daily activity"
                            : period === "30 days"
                                ? "Weekly activity"
                                : "Monthly activity"}
                    </Text>
                </Space>

                <Text type="secondary" className="text-xs">
                    {data.length} data points
                </Text>
            </div>
        </Card>
    );
}
