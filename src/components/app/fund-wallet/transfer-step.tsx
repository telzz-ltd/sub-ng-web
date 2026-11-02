import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    Copy01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { formatNaira } from "@/lib/format";
import { toast } from "@/components/ui/toast";

type Props = {
    amount: number;
    onBack: () => void;
};

const account = {
    name: "Subs.NG",
    bank: "PalmPay",
    number: "9033456789",
};

export function TransferStep({ amount, onBack }: Props) {
    async function copyAccountNumber() {
        try {
            await navigator.clipboard.writeText(account.number);
            toast.add({ type: "error", title: "Account number copied" });
        } catch {
            toast.add({ type: "error", title: "Unable to copy account number" });
        }
    }

    return (
        <Card className="w-full max-w-xl">
            <CardContent className="space-y-4 p-5">
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-2"
                    onClick={onBack}
                >
                    <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                    Back
                </Button>

                <div>
                    <h2 className="text-lg font-semibold">Bank transfer</h2>
                    <p className="text-sm text-muted-foreground">
                        Transfer money to the account below to fund your wallet.
                    </p>
                </div>

                <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                        Transfer amount
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                        {formatNaira(amount)}
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <p className="text-xs text-muted-foreground">
                            ACCOUNT NAME
                        </p>
                        <p className="mt-1 font-semibold">{account.name}</p>
                    </div>

                    <div className="border-b px-4 py-3">
                        <p className="text-xs text-muted-foreground">BANK</p>
                        <p className="mt-1 font-semibold">{account.bank}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                ACCOUNT NUMBER
                            </p>
                            <p className="mt-1 text-base font-semibold">
                                {account.number}
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            onClick={copyAccountNumber}
                        >
                            <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                            Copy
                        </Button>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">
                    Your wallet will be credited once the transfer is confirmed.
                </p>

                <Button
                    size="lg"
                    className="w-full"
                    onClick={() =>
                        toast.add({ title: "Connect this action to your payment confirmation flow." })
                    }
                >
                    I have made the payment
                </Button>
            </CardContent>
        </Card>
    );
}