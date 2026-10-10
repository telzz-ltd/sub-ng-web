"use client";

import { login } from "@/actions/auth";
import { SubmitButton } from "@/components/ui/form";
import {
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useActionState, useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

const initialState = {
  errors: null,
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<any, any>(
    login,
    initialState,
  );

  return (
    <Form action={formAction} validationErrors={state?.errors}>
      <Fieldset>
        <Fieldset.Legend className="text-2xl">Sign In</Fieldset.Legend>
        <Description className="text-sm">
          Enter your details to sign in
        </Description>
        <FieldGroup>
          <TextField isRequired type="email" name="email">
            <Label>Email Address</Label>
            <InputGroup className="h-12 rounded-full bg-white">
              <InputGroup.Prefix>
                <BiEnvelope />
              </InputGroup.Prefix>
              <InputGroup.Input placeholder="Enter email address" />
            </InputGroup>
            <FieldError />
          </TextField>
          <TextField
            type={showPassword ? "text" : "password"}
            isRequired
            name="password"
          >
            <Label>Password</Label>
            <InputGroup className="h-12 rounded-full bg-white">
              <InputGroup.Prefix>
                <RiLockPasswordFill />
              </InputGroup.Prefix>
              <InputGroup.Input placeholder="Enter password" />
              <InputGroup.Suffix onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>
          <SubmitButton isPending={pending} className="h-12 text-base">
            Sign In
          </SubmitButton>
        </FieldGroup>
      </Fieldset>
    </Form>
  );
}
