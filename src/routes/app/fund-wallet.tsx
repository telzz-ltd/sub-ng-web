
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/layout";
import { AmountStep } from "@/components/app/fund-wallet/amount-step";
import { TransferStep } from "@/components/app/fund-wallet/transfer-step";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/app/fund-wallet")({
  component: FundWalletPage,
});

function FundWalletPage() {
  const [accountDetails, setAccountDetails] = useState<any>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {

    },
  })

  return (
    <AppLayout
      title="Fund wallet"
      description="Add money to your wallet to pay for airtime, data, bills and more."
    >
      <div className="mx-auto w-full max-w-xl py-6">
        {!accountDetails ? (
          <AmountStep onContinue={mutate} />
        ) : (
          <TransferStep account={accountDetails} onBack={() => setAccountDetails(null)} />
        )}
      </div>
    </AppLayout>
  );
}
