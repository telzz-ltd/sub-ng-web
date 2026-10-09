"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Envelope } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Form() {
  return (
    <form action="">
      <FieldSet>
        <FieldLegend>Sign In</FieldLegend>
        <FieldDescription>Enter your details to sign in</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>
              Email Address <span className="text-destructive">*</span>
            </FieldLabel>
            <InputGroup className="h-14">
              <InputGroupAddon>
                <HugeiconsIcon icon={Envelope} />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Enter email address"
                type="email"
                required
              />
            </InputGroup>
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Link
                href="/forgot-password"
                className="text-primary font-medium hover:underline"
              >
                Forgot Password
              </Link>
            </div>
            <InputGroup className="h-14">
              <InputGroupAddon>
                <HugeiconsIcon icon={Envelope} />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Enter email address"
                type="email"
                required
              />
            </InputGroup>
          </Field>

          <Button className="w-full h-14" size="lg">
            Sign In
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
