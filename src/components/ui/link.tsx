import { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "./button";

export function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: ReactNode;
  }) {
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ className, size, variant }))}
    />
  );
}
