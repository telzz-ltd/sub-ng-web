import { FormField, SubmitButton } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage, isUnauthorizedError, sendEmailVerificationOtp, verifyEmail } from "@/lib/api";
import { clearAuthSession, setAuthUser, useAuthSession } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckmarkCircle02Icon, Key01Icon, MailSend01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifyEmailSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});

type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;

export const Route = createFileRoute("/_auth/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const session = useAuthSession();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const form = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  async function handleResend() {
    setSending(true);
    try {
      const response = await sendEmailVerificationOtp();
      toast.add({ type: "success", description: response.message });
    } catch (error) {
      if (isUnauthorizedError(error)) {
        clearAuthSession();
        await navigate({ to: "/login", replace: true });
        return;
      }
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    } finally {
      setSending(false);
    }
  }

  async function handleSubmit(values: VerifyEmailValues) {
    try {
      const response = await verifyEmail(values);
      setAuthUser(response.data);
      toast.add({ type: "success", description: response.message });
      await navigate({ to: "/dashboard" });
    } catch (error) {
      if (isUnauthorizedError(error)) {
        clearAuthSession();
        await navigate({ to: "/login", replace: true });
        return;
      }
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    }
  }

  if (!session) {
    return (
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl!">Verify your email</FieldLegend>
          <FieldDescription>Sign in to verify the email on your account.</FieldDescription>
          <Link to="/login" className="font-medium text-primary">
            Back to sign in
          </Link>
        </FieldSet>
      </FieldGroup>
    );
  }

  if (session.user.emailVerified) {
    return (
      <FieldGroup>
        <FieldSet>
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={24} />
          </div>
          <FieldLegend className="text-2xl!">Email verified</FieldLegend>
          <FieldDescription>
            Your email address is confirmed. You are ready to use your account.
          </FieldDescription>
          <Button type="button" size="lg" className="w-full" onClick={() => navigate({ to: "/dashboard" })}>
            Go to dashboard
            <HugeiconsIcon icon={ArrowRight} />
          </Button>
        </FieldSet>
      </FieldGroup>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl!">Verify your email</FieldLegend>
          <FieldDescription>
            We sent a 6-digit code to <span className="font-medium text-foreground">{session.user.email}</span>.
            Enter it below to confirm your account.
          </FieldDescription>

          <FieldGroup className="gap-4">
            <FormField
              icon={Key01Icon}
              control={form.control}
              name="code"
              label="Verification Code"
              placeholder="000000"
              inputProps={{
                inputMode: "numeric",
                maxLength: 6,
                autoComplete: "one-time-code",
                autoFocus: true,
              }}
            />

            <SubmitButton loading={form.formState.isSubmitting} text="Verify email" size="lg" />

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              disabled={sending}
              onClick={handleResend}
            >
              {sending ? <Spinner /> : <HugeiconsIcon icon={MailSend01Icon} />}
              Resend code
            </Button>
          </FieldGroup>
        </FieldSet>

        <p className="mt-5 text-center text-sm">
          <Link to="/dashboard" className="font-medium text-primary">
            Skip for now
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
