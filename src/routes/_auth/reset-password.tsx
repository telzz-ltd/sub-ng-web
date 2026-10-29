
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { App, Button, Form, Input, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { z } from "zod";

const schema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ResetPasswordValues = z.infer<typeof schema>;

export const Route = createFileRoute("/_auth/reset-password")({
    validateSearch: z.object({
        token: z.string().optional(),
    }),
    component: ResetPasswordPage,
});

function ResetPasswordPage() {
    const { token } = Route.useSearch();
    const [isPending, setIsPending] = useState(false);
    const { message } = App.useApp();
    const [form] = Form.useForm<ResetPasswordValues>();

    async function handleSubmit(values: ResetPasswordValues) {
        const result = schema.safeParse(values);
        if (!result.success) return;

        if (!token) {
            message.error("Your reset link is invalid or missing.");
            return;
        }

        setIsPending(true);

        try {
            console.log({ token, password: result.data.password });
            message.info("Connect your password reset handler to continue.");
        } catch {
            message.error("Unable to reset your password. Please try again.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div>
            <header className="mb-5">
                <Typography.Title level={3} className="!mb-1 !mt-0 text-2xl!">
                    Reset your password
                </Typography.Title>
                <Typography.Text type="secondary">
                    Choose a new password for your account.
                </Typography.Text>
            </header>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="password"
                    label="New password"
                    className="!mb-3"
                    rules={[
                        { required: true, message: "Enter a new password" },
                        { min: 8, message: "Password must be at least 8 characters" },
                    ]}
                >
                    <Input.Password
                        size="large"
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm new password"
                    className="!mb-4"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Confirm your new password" },
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
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    loading={isPending}
                >
                    Reset password
                </Button>
            </Form>

            <div className="mt-5 text-center text-sm">
                <Link to="/login" className="text-blue-600">
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}
