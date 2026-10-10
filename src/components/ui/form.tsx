import { Button, ButtonProps, Spinner } from "@heroui/react";

export function SubmitButton({
  children,
  fullWidth = true,
  type = "submit",
  isPending,
  ...props
}: ButtonProps) {
  return (
    <Button fullWidth={fullWidth} isPending={isPending} type={type} {...props}>
      {({ isPending }) => (
        <>
          {isPending ? <Spinner color="current" /> : null}
          {children}
        </>
      )}
    </Button>
  );
}
