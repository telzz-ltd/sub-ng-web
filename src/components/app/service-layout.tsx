import type { ReactNode } from "react";
import { Card, Typography } from "antd";

type ServiceLayoutProps = {
  form: ReactNode;
  summary: ReactNode;
};

export function ServiceLayout({ form, summary }: ServiceLayoutProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card className="rounded-2xl border-gray-200" styles={{ body: { padding: 20 } }}>
        {form}
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
      <Typography.Title level={4} className="mb-1!">
        {title}
      </Typography.Title>
      <Typography.Text type="secondary">{description}</Typography.Text>
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
        <Typography.Text strong>{title}</Typography.Text>
        {extra}
      </div>
      {children}
    </div>
  );
}
