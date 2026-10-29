import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  App,
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Select,
  Switch,
  Tabs,
  Typography,
} from "antd";
import {
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";
import { networks } from "@/lib/catalog";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

const { Text, Paragraph } = Typography;

type ProfileValues = {
  name: string;
  email: string;
  phone: string;
};

type PasswordValues = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const sessions = [
  { id: "s1", device: "Chrome on macOS", location: "Lagos, Nigeria", current: true },
  { id: "s2", device: "Subs.NG app on iPhone", location: "Lagos, Nigeria", current: false },
  { id: "s3", device: "Safari on iPad", location: "Abuja, Nigeria", current: false },
];

function SettingsPage() {
  const { message } = App.useApp();
  const [profileForm] = Form.useForm<ProfileValues>();
  const [passwordForm] = Form.useForm<PasswordValues>();

  const [twoFactor, setTwoFactor] = useState(false);
  const [preferences, setPreferences] = useState({
    transactionAlerts: true,
    serviceUpdates: true,
    promotions: false,
    securityAlerts: true,
  });

  function saveProfile(values: ProfileValues) {
    message.success(`Profile updated for ${values.name}`);
  }

  function updatePassword() {
    passwordForm.resetFields();
    message.success("Your password has been updated");
  }

  const profileTab = (
    <div className="max-w-xl">
      <Flex align="center" gap={16} className="mb-6">
        <Avatar size={64} className="shrink-0! bg-blue-100! text-blue-700!">
          UM
        </Avatar>
        <div className="min-w-0">
          <Text strong className="block text-base">
            Usman Muhammad
          </Text>
          <Text type="secondary" className="text-sm">
            usman@example.com
          </Text>
          <Button
            size="small"
            className="mt-2!"
            onClick={() => message.info("Connect this to your photo upload flow.")}
          >
            Change photo
          </Button>
        </div>
      </Flex>

      <Form
        form={profileForm}
        layout="vertical"
        requiredMark={false}
        initialValues={{
          name: "Usman Muhammad",
          email: "usman@example.com",
          phone: "08012345678",
        }}
        onFinish={saveProfile}
      >
        <Form.Item
          name="name"
          label="Full name"
          rules={[{ required: true, message: "Enter your full name" }]}
        >
          <Input prefix={<UserOutlined className="text-gray-400" />} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: "Enter your email address" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input prefix={<MailOutlined className="text-gray-400" />} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone number"
          rules={[{ required: true, message: "Enter your phone number" }]}
        >
          <Input prefix="+234" />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Save changes
        </Button>
      </Form>
    </div>
  );

  const securityTab = (
    <div className="max-w-xl space-y-6">
      <div>
        <Text strong className="block text-base">
          Change password
        </Text>
        <Text type="secondary" className="text-sm">
          Choose a strong password you don't use anywhere else.
        </Text>

        <Form
          form={passwordForm}
          layout="vertical"
          requiredMark={false}
          onFinish={updatePassword}
          className="mt-4"
        >
          <Form.Item
            name="currentPassword"
            label="Current password"
            rules={[{ required: true, message: "Enter your current password" }]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
          </Form.Item>

          <Form.Item
            name="password"
            label="New password"
            rules={[
              { required: true, message: "Enter a new password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm new password"
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
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Update password
          </Button>
        </Form>
      </div>

      <Divider className="my-0!" />

      <Flex align="start" justify="space-between" gap={16}>
        <div>
          <Flex align="center" gap={8}>
            <SafetyCertificateOutlined className="text-emerald-600" />
            <Text strong>Two-factor authentication</Text>
          </Flex>
          <Paragraph className="mb-0! mt-1! text-sm! text-gray-500!">
            Add an extra layer of security to your account.
          </Paragraph>
        </div>

        <Switch
          checked={twoFactor}
          onChange={(checked) => {
            setTwoFactor(checked);
            message.success(
              checked
                ? "Two-factor authentication enabled"
                : "Two-factor authentication disabled",
            );
          }}
        />
      </Flex>

      <Divider className="my-0!" />

      <div>
        <Text strong className="block text-base">
          Active sessions
        </Text>
        <Text type="secondary" className="text-sm">
          Devices currently signed in to your account.
        </Text>

        <List
          className="mt-3"
          itemLayout="horizontal"
          dataSource={sessions}
          renderItem={(session) => (
            <List.Item
              actions={[
                session.current ? (
                  <Text key="current" type="secondary" className="text-xs">
                    This device
                  </Text>
                ) : (
                  <Button
                    key="revoke"
                    type="link"
                    danger
                    size="small"
                    icon={<LogoutOutlined />}
                    onClick={() => message.success("Session revoked")}
                  >
                    Revoke
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={session.device}
                description={session.location}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );

  const notificationTab = (
    <div className="max-w-xl space-y-2">
      {[
        {
          key: "transactionAlerts",
          title: "Transaction alerts",
          description: "Get notified for every credit and debit.",
        },
        {
          key: "serviceUpdates",
          title: "Service updates",
          description: "Delivery status for airtime, data and bills.",
        },
        {
          key: "promotions",
          title: "Promotions",
          description: "Offers, discounts and product announcements.",
        },
        {
          key: "securityAlerts",
          title: "Security alerts",
          description: "Important sign-in and account activity.",
        },
      ].map((item) => (
        <Flex
          key={item.key}
          align="center"
          justify="space-between"
          gap={16}
          className="rounded-xl border border-gray-100 p-4"
        >
          <div>
            <Text strong>{item.title}</Text>
            <Text type="secondary" className="mt-0.5 block text-sm">
              {item.description}
            </Text>
          </div>

          <Switch
            checked={preferences[item.key as keyof typeof preferences]}
            onChange={(checked) =>
              setPreferences((current) => ({
                ...current,
                [item.key]: checked,
              }))
            }
          />
        </Flex>
      ))}
    </div>
  );

  const preferencesTab = (
    <div className="max-w-xl">
      <Form
        layout="vertical"
        requiredMark={false}
        initialValues={{
          network: "mtn",
          language: "en",
          currency: "NGN",
        }}
        onFinish={() => message.success("Preferences saved")}
      >
        <Form.Item name="currency" label="Currency">
          <Select
            disabled
            options={[{ label: "Nigerian Naira (₦)", value: "NGN" }]}
          />
        </Form.Item>

        <Form.Item name="language" label="Language">
          <Select
            options={[
              { label: "English", value: "en" },
              { label: "French", value: "fr" },
            ]}
          />
        </Form.Item>

        <Form.Item name="network" label="Default network">
          <Select
            options={networks.map((network) => ({
              label: network.name,
              value: network.id,
            }))}
          />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Save preferences
        </Button>
      </Form>
    </div>
  );

  return (
    <AppLayout
      title="Settings"
      description="Manage your profile, security and notification preferences."
    >
      <Card className="rounded-2xl border-gray-200" styles={{ body: { padding: 0 } }}>
        <Tabs
          defaultActiveKey="profile"
          className="px-4 pt-1 sm:px-6"
          items={[
            {
              key: "profile",
              label: "Profile",
              children: <div className="pb-6">{profileTab}</div>,
            },
            {
              key: "security",
              label: "Security",
              children: <div className="pb-6">{securityTab}</div>,
            },
            {
              key: "notifications",
              label: "Notifications",
              children: <div className="pb-6">{notificationTab}</div>,
            },
            {
              key: "preferences",
              label: "Preferences",
              children: <div className="pb-6">{preferencesTab}</div>,
            },
          ]}
        />
      </Card>
    </AppLayout>
  );
}
