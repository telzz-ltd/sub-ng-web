
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { App, Button, Form, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { z } from "zod";

const schema = z.object({
    code: z.string().length(6, "Enter the 6-digit verification code").regex(/^\d{6}$/, "Enter a valid 6-digit code"),
});

type VerifyEmailValues = z.infer<typeof schema>;

export const Route = createFileRoute("/_auth/verify-email")({
    validateSearch: z.object({
        email: z.email().optional(),
    }),
    component: VerifyEmailPage,
});

function VerifyEmailPage() {
    const { email } = Route.useSearch();
    const [isPending, setIsPending] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const { message } = App.useApp();
    const [form] = Form.useForm<VerifyEmailValues>();

    async function handleSubmit(values: VerifyEmailValues) {
        const result = schema.safeParse(values);
        if (!result.success) return;

        setIsPending(true);

        try {
            console.log({ email, code: result.data.code });
            message.info("Connect your email verification handler to continue.");
        } catch {
            message.error("Unable to verify your email. Please try again.");
        } finally {
            setIsPending(false);
        }
    }

    async function handleResend() {
        if (!email) {
            message.error("Your email address is missing.");
            return;
        }

        setIsResending(true);

        try {
            console.log({ email });
            message.info("Connect your resend verification handler to continue.");
        } catch {
            message.error("Unable to resend the code. Please try again.");
        } finally {
            setIsResending(false);
        }
    }

    return (
        <div>
            <header className="mb-5">
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <MailOutlined className="text-lg" />
                </div>

                <Typography.Title level={3} className="!mb-1 !mt-0 text-2xl!">
                    Verify your email
                </Typography.Title>

                <Typography.Text type="secondary">
                    Enter the 6-digit code sent to{" "}
                    <Typography.Text strong>{email || "your email address"}</Typography.Text>.
                </Typography.Text>
            </header>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="code"
                    label="Verification code"
                    className="!mb-4"
                    rules={[
                        { required: true, message: "Enter the verification code" },
                        { len: 6, message: "The code must contain 6 digits" },
                        {
                            pattern: /^\d{6}$/,
                            message: "Enter a valid 6-digit code",
                        },
                    ]}
                >
                    <Input.OTP length={6} size="large" />
                </Form.Item>

                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    loading={isPending}
                >
                    Verify email
                </Button>
            </Form>

            <div className="mt-4 text-center text-sm">
                <Typography.Text type="secondary">
                    Didn't receive the code?{" "}
                </Typography.Text>
                <Button
                    type="link"
                    className="!p-0"
                    loading={isResending}
                    onClick={handleResend}
                >
                    Resend code
                </Button>
            </div>

            <div className="mt-3 text-center text-sm">
                <Link to="/login" className="text-blue-600">
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}
