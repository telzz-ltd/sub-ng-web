import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle>Add money</CardTitle>
                <CardDescription>
                    Choose how much you want to add to your wallet.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <Label>Choose an amount</Label>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {presets.map((preset) => (
                            <Button
                                key={preset}
                                variant={
                                    amount === String(preset)
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => onAmountChange(String(preset))}
                            >
                                {formatNaira(preset, 0)}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <Label htmlFor="funding-amount">
                        Or enter an amount
                    </Label>

                    <div className="relative mt-3">
                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                            ₦
                        </span>

                        <Input
                            id="funding-amount"
                            className="h-11 pl-8"
                            value={amount}
                            onChange={(event) => handleChange(event.target.value)}
                            inputMode="decimal"
                            placeholder="0.00"
                            aria-label="Amount to add"
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && isValid) {
                                    onContinue();
                                }
                            }}
                        />
                    </div>

                    {amount !== "" && !isValid && (
                        <p className="mt-2 text-sm text-destructive">
                            Enter an amount of at least ₦1,000.
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <span className="text-sm text-muted-foreground">
                        Amount to fund
                    </span>

                    <span className="text-xl font-semibold">
                        {amount !== "" && Number.isFinite(numericAmount)
                            ? formatNaira(numericAmount)
                            : formatNaira(0)}
                    </span>
                </div>

                <Button
                    className="w-full"
                    size="lg"
                    disabled={!isValid}
                    onClick={onContinue}
                >
                    Continue
                </Button>
            </CardContent>
        </Card>
    );
}