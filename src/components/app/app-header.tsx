import { Typography } from "@heroui/react";

export function AppHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="">
      <Typography.Heading level={2} className="text-h3 font-black">
        {title}
      </Typography.Heading>
      <Typography.Paragraph className="text-muted">
        {description}
      </Typography.Paragraph>
    </div>
  );
}
