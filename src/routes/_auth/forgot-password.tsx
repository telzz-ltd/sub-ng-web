
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { App, Button, Form, Input, Typography } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { z } from "zod";

const schema = z.object({
    email: z.email("Enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof schema>;

export const Route = createFileRoute("/_auth/forgot-password")({
    component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
    const [isPending, setIsPending] = useState(false);
    const { message } = App.useApp();
    const [form] = Form.useForm<ForgotPasswordValues>();

    async function handleSubmit(values: ForgotPasswordValues) {
        const result = schema.safeParse(values);
        if (!result.success) return;

        setIsPending(true);

        try {
            console.log(result.data);
            message.success("If an account exists, password reset instructions will be sent.");
        } catch {
            message.error("Unable to process your request. Please try again.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div>
            <header className="mb-5">
                <Typography.Title level={3} className="!mb-1 !mt-0 text-2xl!">
                    Forgot password?
                </Typography.Title>
                <Typography.Text type="secondary">
                    Enter your email address and we'll send you instructions to reset your password.
                </Typography.Text>
            </header>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    label="Email address"
                    className="!mb-4"
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

                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    loading={isPending}
                >
                    Send reset instructions
                </Button>
            </Form>

            <div className="mt-5 text-center">
                <Link to="/login" className="text-sm text-blue-600">
                    <ArrowLeftOutlined className="mr-2" />
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}
