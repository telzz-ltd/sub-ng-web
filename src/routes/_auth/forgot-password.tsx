import { FormField, SubmitButton } from "@/components/form/form-field";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage, sendPasswordResetOtp } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function handleSubmit(values: ForgotPasswordValues) {
    try {
      const response = await sendPasswordResetOtp(values);
      toast.add({ type: "success", description: response.message });
      await navigate({
        to: "/reset-password",
        search: { email: values.email },
      });
    } catch (error) {
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl!">Forgot password?</FieldLegend>
          <FieldDescription>
            Enter your email address and we will send you a 6-digit code to reset your password.
          </FieldDescription>

          <FieldGroup className="gap-4">
            <FormField
              icon={Mail01Icon}
              control={form.control}
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              inputProps={{ autoComplete: "email", autoFocus: true }}
            />

            <SubmitButton loading={form.formState.isSubmitting} text="Send reset code" size="lg" />
          </FieldGroup>
        </FieldSet>

        <p className="mt-5 text-center text-sm">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 font-medium text-primary"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
            Back to sign in
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
