import { FormField, SubmitButton } from "@/components/form/form-field";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage, register } from "@/lib/api";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtIcon, LockPasswordIcon, UserIcon } from "@hugeicons/core-free-icons";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your full name")
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
    email: z.email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters"),
    // confirmPassword: z.string().min(1, "Confirm your password"),
    acceptTerms: z.boolean().refine((value) => value, {
      message: "You must accept the Terms & Conditions",
    }),
  })
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

type RegisterValues = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  const setAuthSession = useAuthStore((s) => s.setSession);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function handleSubmit(values: RegisterValues) {
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        acceptTerms: values.acceptTerms,
      });
      setAuthSession(response.data);
      toast.add({ type: "success", description: response.message });
      await navigate({ to: "/verify-email" });
    } catch (error) {
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl!">Create your account</FieldLegend>
          <FieldDescription>Start paying for airtime, data and bills in seconds.</FieldDescription>

          <FieldGroup className="gap-4">
            <FormField
              icon={UserIcon}
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Baba Balogun"
              inputProps={{ autoComplete: "name" }}
            />
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
              placeholder="Create a password"
              inputProps={{ autoComplete: "new-password" }}
            />
            {/* <FormField
              control={form.control}
              icon={LockPasswordIcon}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              inputProps={{ autoComplete: "new-password" }}
            /> */}

            <FormField
              control={form.control}
              name="acceptTerms"
              type="checkbox"
              label="Accept Terms & Conditions"
            />

            <SubmitButton loading={form.formState.isSubmitting} text="Create account" size="lg" />
          </FieldGroup>
        </FieldSet>

        <p className="mt-5 text-center text-sm">
          <span> Already have an account? </span>
          <Link to="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
