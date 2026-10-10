"use client";

import { AppHeader } from "@/components/app/app-header";
import { SubmitButton } from "@/components/ui/form";
import { formatAmount, useAmountInputProps } from "@/lib/amount";
import { formatCurrency } from "@/lib/utils";
import {
  Button,
  Card,
  Description,
  Form,
  InputGroup,
  Label,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@heroui/react";
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
    <>
      <AppHeader title="Fund Wallet" />
      <Card className="max-w-4xl" hidden={accountDetails}>
        <Card.Header>
          <Card.Title className="text-xl">Amount (₦)</Card.Title>
          <Description>Enter amount to fund in Naira</Description>
        </Card.Header>
        <Card.Content className="mt-4">
          <Form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
            <Controller
              control={form.control}
              name="amount"
              render={({ field }) => (
                <TextField name={field.name}>
                  <InputGroup className="h-14 rounded-full">
                    <InputGroup.Prefix className="text-2xl">
                      ₦
                    </InputGroup.Prefix>
                    <AmountInput
                      {...field}
                      placeholder="Enter amount"
                      className="text-xl! font-medium"
                    />
                  </InputGroup>
                </TextField>
              )}
            />

            <Controller
              control={form.control}
              name="amount"
              render={({ field }) => (
                <RadioGroup
                  value={field.value.toString()}
                  onChange={(value) => field.onChange(parseInt(value, 10))}
                  orientation="horizontal"
                  onBlur={field.onBlur}
                >
                  {[500, 1000, 2000, 5000, 10000, 20000, 50000].map((v) => (
                    <Radio value={v.toString()} key={v}>
                      <Radio.Content className="shadow p-3 rounded-2xl data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10">
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        <span>{formatCurrency(v)}</span>
                      </Radio.Content>
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            />

            <SubmitButton
              type="submit"
              className="w-full h-12 text-base"
              size="lg"
              isPending={isPending}
              label="Continue"
            />
          </Form>
        </Card.Content>
      </Card>

      <Card className="max-w-3xl mx-auto" hidden={!accountDetails}>
        <Card.Header>
          <Card.Title className="text-2xl">Account Details</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div className="space-y-1">
            <Label>Account Name:</Label>
            <Typography.Heading level={5}>
              Subs.NG(Pay NGN 500.00)
            </Typography.Heading>
          </div>
          <div className="space-y-1">
            <Label>Bank Name:</Label>
            <Typography.Heading level={5}>PalmPay</Typography.Heading>
          </div>
          <div className="">
            <Label>Amount:</Label>
            <div className="flex items-center gap-1">
              <Typography.Heading level={3}>
                {formatAmount(form.getValues("amount"))}
              </Typography.Heading>

              <Button
                isIconOnly
                size="sm"
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
            </div>
          </div>
          <div className="">
            <Label>Account Number:</Label>
            <Typography.Heading level={2}>9033456789</Typography.Heading>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button className="w-full" size="lg">
            I have made the payment
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

function AmountInput({ ...props }: React.ComponentProps<"input">) {
  const amountProps = useAmountInputProps({
    ...(props as any),
  });
  return <InputGroup.Input {...amountProps} />;
}
