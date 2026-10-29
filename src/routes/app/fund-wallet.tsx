
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/layout";
import { AmountStep } from "@/components/app/fund-wallet/amount-step";
import { TransferStep } from "@/components/app/fund-wallet/transfer-step";

export const Route = createFileRoute("/app/fund-wallet")({
  component: FundWalletPage,
});

function FundWalletPage() {
  const [amount, setAmount] = useState("1000");
  const [step, setStep] = useState<"amount" | "transfer">("amount");

  return (
    <AppLayout
      title="Fund wallet"
      description="Add money to your wallet to pay for airtime, data, bills and more."
    >
      <div className="mx-auto w-full max-w-xl py-6">
        {step === "amount" ? (
          <AmountStep
            amount={amount}
            onAmountChange={setAmount}
            onContinue={() => {
              const value = Number(amount);

              if (Number.isFinite(value) && value >= 1000) {
                setStep("transfer");
              }
            }}
          />
        ) : (
          <TransferStep
            amount={Number(amount)}
            onBack={() => setStep("amount")}
          />
        )}
      </div>
    </AppLayout>
  );
}
