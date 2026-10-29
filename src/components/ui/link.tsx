import { buttonVariants, cn } from "@heroui/styles";
import { Link, LinkProps } from "@tanstack/react-router";
import { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
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
