"use client";

import { AppLayout } from "@/components/app/layout";
import { SubmitButton } from "@/components/ui/form";
import { formatAmount, useAmountInputProps } from "@/lib/amount";
import {
  Button,
  Card,
  cn,
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
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineArrowSmRight } from "react-icons/hi";
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
    <AppLayout title="Fund Wallet">
      <Card className="max-w-4xl p-8 border" hidden={accountDetails}>
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
                  <Label>Choose Amount </Label>
                  <RadioGroup
                    value={field.value.toString()}
                    onChange={(value) => field.onChange(parseInt(value, 10))}
                    orientation="horizontal"
                    onBlur={field.onBlur}
                    aria-label={field.value.toString()}
                  >
                    {[500, 1000, 2000, 5000, 10000, 20000, 50000].map((v) => (
                      <Radio value={v.toString()} key={v}>
                        <Radio.Content
                          className={cn(
                            "group relative w-full rounded-xl border bg-surface px-5 py-4 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
                            "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
                          )}
                        >
                          {/* <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control> */}
                          <span className="text-lg font-medium">
                            ₦{v.toLocaleString("en-NG")}
                          </span>
                        </Radio.Content>
                      </Radio>
                    ))}
                  </RadioGroup>
                </TextField>
              )}
            />

            <Controller
              control={form.control}
              name="amount"
              render={({ field }) => (
                <TextField name={field.name}>
                  <Label>Enter custom amount</Label>
                  <InputGroup className="h-14 border-b-2 border-b-inherit focus-within:ring-0 focus-within:border-b-accent rounded-none  shadow-none">
                    <InputGroup.Prefix className="text-xl">₦</InputGroup.Prefix>
                    <AmountInput
                      {...field}
                      placeholder="Enter amount"
                      className="text-3xl! font-bold placeholder:text-lg placeholder:font-medium"
                    />
                  </InputGroup>
                </TextField>
              )}
            />

            <SubmitButton
              type="submit"
              className="w-full h-12 text-base mt-8"
              size="lg"
              isPending={isPending}
            >
              Continue
              <HiOutlineArrowSmRight />
            </SubmitButton>
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
                <AiOutlineEdit />
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
    </AppLayout>
  );
}

function AmountInput({ ...props }: React.ComponentProps<"input">) {
  const amountProps = useAmountInputProps({
    ...(props as any),
  });
  return <InputGroup.Input {...amountProps} />;
}
