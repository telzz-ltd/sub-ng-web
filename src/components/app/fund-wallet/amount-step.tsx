
import { Button, Card, Flex, Input, Typography } from "antd";
import { formatNaira } from "@/lib/format";

const presets = [1000, 2000, 5000, 10000, 20000, 50000];

type Props = {
    amount: string;
    onAmountChange: (amount: string) => void;
    onContinue: () => void;
};

export function AmountStep({
    amount,
    onAmountChange,
    onContinue,
}: Props) {
    const numericAmount = Number(amount);
    const isValid =
        amount.trim() !== "" &&
        Number.isFinite(numericAmount) &&
        numericAmount >= 1000;


    function handleChange(value: string) {
        // Allow digits and a single decimal point.
        const cleaned = value.replace(/[^\d.]/g, "");
        const decimalIndex = cleaned.indexOf(".");

        const normalized =
            decimalIndex === -1
                ? cleaned
                : cleaned.slice(0, decimalIndex + 1) +
                cleaned.slice(decimalIndex + 1).replace(/\./g, "").slice(0, 2);

        onAmountChange(normalized);
    }


    return (
        <Card className="w-full max-w-xl" styles={{ body: { padding: 24 } }}>
            <Flex vertical gap={24}>
                <div>
                    <Typography.Title level={4} className="!mb-1">
                        Add money
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        Choose how much you want to add to your wallet.
                    </Typography.Text>
                </div>

                <div>
                    <Typography.Text strong>Choose an amount</Typography.Text>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {presets.map((preset) => (
                            <Button
                                key={preset}
                                block
                                type={amount === String(preset) ? "primary" : "default"}
                                onClick={() => onAmountChange(String(preset))}
                            >
                                {formatNaira(preset, 0)}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <Typography.Text strong>Or enter an amount</Typography.Text>
                    <Input
                        className="mt-3"
                        size="large"
                        prefix="₦"
                        value={amount}
                        onChange={(event) => handleChange(event.target.value)}
                        inputMode="decimal"
                        placeholder="0.00"
                        aria-label="Amount to add"
                        onPressEnter={() => isValid && onContinue()}
                    />
                    {amount !== "" && !isValid && (
                        <Typography.Text type="danger" className="mt-2 block">
                            Enter an amount of at least ₦1,000.
                        </Typography.Text>
                    )}
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                    <Flex justify="space-between" align="center">
                        <Typography.Text type="secondary">
                            Amount to fund
                        </Typography.Text>
                        <Typography.Title level={4} className="!mb-0">
                            {amount !== "" && Number.isFinite(numericAmount)
                                ? formatNaira(numericAmount)
                                : formatNaira(0)}
                        </Typography.Title>
                    </Flex>
                </div>

                <Button
                    type="primary"
                    size="large"
                    block
                    disabled={!isValid}
                    onClick={onContinue}
                >
                    Continue
                </Button>
            </Flex>
        </Card>
    );
}
