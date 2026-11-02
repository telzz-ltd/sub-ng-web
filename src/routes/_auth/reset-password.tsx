import { FormField, SubmitButton } from "@/components/form/form-field";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage, resetPassword } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft01Icon, Key01Icon, LockPasswordIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    email: z.email("Enter a valid email address"),
    code: z.string().length(6, "Enter the 6-digit code"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const Route = createFileRoute("/_auth/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { email } = Route.useSearch();
  const navigate = useNavigate();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: ResetPasswordValues) {
    try {
      const response = await resetPassword({
        email: values.email,
        code: values.code,
        password: values.password,
      });
      toast.add({ type: "success", description: response.message });
      await navigate({ to: "/login" });
    } catch (error) {
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl!">Reset your password</FieldLegend>
          <FieldDescription>
            Enter the code sent to your email and choose a new password.
          </FieldDescription>

          <FieldGroup className="gap-4">
            <FormField
              icon={Mail01Icon}
              control={form.control}
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              inputProps={{ autoComplete: "email" }}
            />
            <FormField
              icon={Key01Icon}
              control={form.control}
              name="code"
              label="Reset Code"
              placeholder="000000"
              inputProps={{
                inputMode: "numeric",
                maxLength: 6,
                autoComplete: "one-time-code",
              }}
            />
            <FormField
              control={form.control}
              icon={LockPasswordIcon}
              name="password"
              type="password"
              label="New Password"
              placeholder="Create a new password"
              inputProps={{ autoComplete: "new-password" }}
            />
            <FormField
              control={form.control}
              icon={LockPasswordIcon}
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              inputProps={{ autoComplete: "new-password" }}
            />

            <SubmitButton loading={form.formState.isSubmitting} text="Reset password" size="lg" />
          </FieldGroup>
        </FieldSet>

        <p className="mt-5 text-center text-sm">
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-1 font-medium text-primary"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
            Send a new code
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
