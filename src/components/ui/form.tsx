import { Button, ButtonProps, Spinner } from "@heroui/react";

export function SubmitButton({
  label,
  fullWidth = true,
  type = "submit",
  isPending,
  ...props
}: ButtonProps & { label: string }) {
  return (
    <Button fullWidth={fullWidth} isPending={isPending} type={type} {...props}>
      {({ isPending }) => (
        <>
          {isPending ? <Spinner color="current" /> : null}
          {label}
        </>
      )}
    </Button>
  );
}
