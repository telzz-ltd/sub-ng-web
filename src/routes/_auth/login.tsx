import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { App, Button, Checkbox, Form, Input, Typography } from "antd";
import {
  LockOutlined,
  MailOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const { message } = App.useApp();
  const [form] = Form.useForm<LoginValues>();

  async function handleSubmit(values: LoginValues) {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      return;
    }

    setIsPending(true);

    try {
      console.log(result.data);
      message.info("Connect your login handler to continue.");
    } catch {
      message.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <header className="mb-5">
        <Typography.Title level={3} className="!mb-1 !mt-0 text-2xl!">
          Welcome back
        </Typography.Title>
        <Typography.Text type="secondary">
          Sign in to manage your wallet and subscriptions.
        </Typography.Text>
      </header>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          name="email"
          label="Email address"
          className="!mb-3"
          rules={[
            { required: true, message: "Enter your email address" },
            {
              validator: async (_, value: string | undefined) => {
                const result = z.email().safeParse(value);
                if (value && !result.success) {
                  throw new Error("Enter a valid email address");
                }
              },
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="name@example.com"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          className="!mb-3"
          rules={[
            { required: true, message: "Enter your password" },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className="mb-4 flex items-center justify-between gap-3 text-sm">
          <Checkbox>Remember me</Checkbox>
          <Link
            to="/forgot-password"
            className="whitespace-nowrap text-blue-600"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          loading={isPending}
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
        >
          Sign in
        </Button>
      </Form>

      <div className="mt-5 text-center text-sm">
        <Typography.Text type="secondary">
          New to Subs.NG?{" "}
        </Typography.Text>
        <Link to="/register" className="font-medium text-blue-600">
          Create an account
        </Link>
      </div>
    </div>
  );
}