import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type ServiceLayoutProps = {
  form: ReactNode;
  summary: ReactNode;
};

export function ServiceLayout({ form, summary }: ServiceLayoutProps) {
  return (
    <div className="grid w-full max-w-5xl items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card className="rounded-2xl">
        <CardContent className="p-5">{form}</CardContent>
      </Card>

      {summary}
    </div>
  );
}

export function ServiceFormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function FormSection({
  title,
  children,
  extra,
}: {
  title: string;
  children: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {extra}
      </div>

      {children}
    </div>
  );
}