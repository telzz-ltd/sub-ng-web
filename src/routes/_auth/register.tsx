
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { App, Button, Form, Input, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const [isPending, setIsPending] = useState(false);
  const { message } = App.useApp();
  const [form] = Form.useForm<RegisterValues>();

  async function handleSubmit(values: RegisterValues) {
    const result = registerSchema.safeParse(values);

    if (!result.success) return;

    setIsPending(true);

    try {
      console.log(result.data);
      message.info("Connect your registration handler to continue.");
    } catch {
      message.error("Unable to create your account. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <header className="mb-5">
        <Typography.Title level={3} className="!mb-1 !mt-0 text-2xl!">
          Create an account
        </Typography.Title>
        <Typography.Text type="secondary">
          Get started with your Subs.NG account.
        </Typography.Text>
      </header>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <Form.Item
          name="name"
          label="Full name"
          className="!mb-3"
          rules={[{ required: true, whitespace: true, message: "Enter your full name" },
          { min: 2, message: "Name must be at least 2 characters" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Your full name"
            autoComplete="name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          className="!mb-3"
          rules={[
            { required: true, message: "Enter your email address" },
            { type: "email", message: "Enter a valid email address" },
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
            { required: true, message: "Enter a password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          className="!mb-4"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          loading={isPending}
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
        >
          Create account
        </Button>
      </Form>

      <div className="mt-5 text-center text-sm">
        <Typography.Text type="secondary">
          Already have an account?{" "}
        </Typography.Text>
        <Link to="/login" className="font-medium text-blue-600">
          Sign in
        </Link>
      </div>
    </div>
  );
}
