"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { formatAmount, useAmountInputProps } from "@/lib/amount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function Page() {
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const submit = (values: any) => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setAccountDetails({});
      console.log(values);
    });
  };

  const form = useForm({
    resolver: zodResolver(
      z.object({
        amount: z.number().min(1000),
      }),
    ),
    defaultValues: {
      amount: 1000,
    },
  });

  return (
    <div className="max-w-xl mx-auto">
      <form
        className="space-y-4"
        hidden={accountDetails}
        onSubmit={form.handleSubmit((v) => submit(v))}
      >
        <Controller
          control={form.control}
          name="amount"
          render={({ field, fieldState }) => (
            <Field className="gap-1">
              <FieldLabel className="text-base">Amount (₦)</FieldLabel>
              <FieldDescription className="mb-2">
                Enter amount to fund in Naira
              </FieldDescription>
              <InputGroup className="bg-white h-12 px-3">
                <InputGroupAddon className="text-2xl">₦</InputGroupAddon>
                <AmountInput
                  {...field}
                  placeholder="Enter amount"
                  className="text-xl! font-medium"
                  aria-invalid={!!fieldState.error}
                />
              </InputGroup>
              <FieldDescription
                hidden={!fieldState.error}
                className="text-destructive"
              >
                {fieldState.error?.message}
              </FieldDescription>
            </Field>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12"
          size="lg"
          disabled={isPending}
        >
          {isPending && <Spinner />}
          Continue
        </Button>
      </form>

      <Card className="" hidden={!accountDetails}>
        <CardHeader className="border-b">
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Account Name:</Label>
            <h2 className="text-h5">Subs.NG(Pay NGN 500.00)</h2>
          </div>
          <div className="space-y-1">
            <Label>Bank Name:</Label>
            <h2 className="text-h5">PalmPay</h2>
          </div>
          <div className="">
            <Label>Amount:</Label>
            <h2 className="text-h3 flex items-center gap-1">
              {formatAmount(form.getValues("amount"))}
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => {
                  setAccountDetails(null);
                  form.setFocus("amount");
                }}
              >
                <HugeiconsIcon
                  icon={Edit02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </Button>
            </h2>
          </div>
          <div className="">
            <Label>Account Number:</Label>
            <h2 className="text-h1">9033456789</h2>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            I have made the payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function AmountInput({ ...props }: React.ComponentProps<"input">) {
  const amountProps = useAmountInputProps({
    ...(props as any),
  });
  return <InputGroupInput {...amountProps} />;
}
