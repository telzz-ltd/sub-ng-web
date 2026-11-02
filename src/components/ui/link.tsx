import { Link, type LinkProps } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "cn";

export function ButtonLink({ className, size = "default", variant = "default", ...props }:
    LinkProps & VariantProps<typeof buttonVariants> & { className?: string }
) {
    return <Link {...props} className={cn(buttonVariants({ className, size, variant }))} />
}