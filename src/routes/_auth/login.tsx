import { FormField, SubmitButton } from "@/components/form/form-field";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage, login } from "@/lib/api";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, AtIcon, LockPasswordIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const setAuthSession = useAuthStore((s) => s.setSession);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: LoginValues) {
    try {
      const response = await login(values);
      setAuthSession(response.data);
      toast.add({ type: "success", description: response.message });
      await navigate({
        to: response.data.user.emailVerified ? "/app" : "/verify-email",
      });
    } catch (error) {
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl!">Welcome back</FieldLegend>
          <FieldDescription>Sign in to manage your wallet and subscriptions.</FieldDescription>

          <FieldGroup className="gap-4">
            <FormField
              icon={AtIcon}
              control={form.control}
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              inputProps={{ autoComplete: "email" }}
            />
            <FormField
              control={form.control}
              icon={LockPasswordIcon}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              inputProps={{ autoComplete: "current-password" }}
            />

            <div className="flex justify-end text-sm">
              <Link
                to="/forgot-password"
                className="whitespace-nowrap font-medium text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <SubmitButton
              loading={form.formState.isSubmitting}
              text={
                <>
                  Sign in
                  <HugeiconsIcon icon={ArrowRight} />
                </>
              }
              size="lg"
            />
          </FieldGroup>
        </FieldSet>

        <p className="mt-5 text-center text-sm">
          <span> New to the platform? </span>
          <Link to="/register" className="font-medium text-primary">
            Create an account
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
