import {
  LockPasswordIcon,
  Logout01Icon,
  Mail01Icon,
  Shield01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { AppLayout } from "@/components/app/layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { networks } from "@/lib/catalog";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

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

type ProfileErrors = Partial<Record<keyof ProfileValues, string>>;
type PasswordErrors = Partial<Record<keyof PasswordValues, string>>;

const sessions = [
  {
    id: "s1",
    device: "Chrome on macOS",
    location: "Lagos, Nigeria",
    current: true,
  },
  {
    id: "s2",
    device: "Subs.NG app on iPhone",
    location: "Lagos, Nigeria",
    current: false,
  },
  {
    id: "s3",
    device: "Safari on iPad",
    location: "Abuja, Nigeria",
    current: false,
  },
];

const notificationOptions = [
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
] as const;

type NotificationKey = (typeof notificationOptions)[number]["key"];

function SettingsPage() {
  const [profile, setProfile] = useState<ProfileValues>({
    name: "Usman Muhammad",
    email: "usman@example.com",
    phone: "08012345678",
  });

  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});

  const [password, setPassword] = useState<PasswordValues>({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [twoFactor, setTwoFactor] = useState(false);

  const [preferences, setPreferences] = useState({
    transactionAlerts: true,
    serviceUpdates: true,
    promotions: false,
    securityAlerts: true,
  });

  const [defaultNetwork, setDefaultNetwork] = useState("mtn");
  const [language, setLanguage] = useState("en");

  function updateProfile(field: keyof ProfileValues, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setProfileErrors((current) => ({ ...current, [field]: undefined }));
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: ProfileErrors = {};

    if (!profile.name.trim()) {
      errors.name = "Enter your full name";
    }

    if (!profile.email.trim()) {
      errors.email = "Enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!profile.phone.trim()) {
      errors.phone = "Enter your phone number";
    }

    setProfileErrors(errors);

    if (Object.keys(errors).length > 0) return;

    toast.add({
      type: "success",
      title: `Profile updated for ${profile.name}`,
    });
  }

  function updatePasswordField(
    field: keyof PasswordValues,
    value: string,
  ) {
    setPassword((current) => ({ ...current, [field]: value }));
    setPasswordErrors((current) => ({ ...current, [field]: undefined }));
  }

  function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: PasswordErrors = {};

    if (!password.currentPassword) {
      errors.currentPassword = "Enter your current password";
    }

    if (!password.password) {
      errors.password = "Enter a new password";
    } else if (password.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!password.confirmPassword) {
      errors.confirmPassword = "Confirm your new password";
    } else if (password.password !== password.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setPassword({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });

    toast.add({
      type: "success",
      title: "Your password has been updated",
    });
  }

  function toggleTwoFactor(checked: boolean) {
    setTwoFactor(checked);

    toast.add({
      type: "success",
      title: checked
        ? "Two-factor authentication enabled"
        : "Two-factor authentication disabled",
    });
  }

  function updateNotification(key: NotificationKey, checked: boolean) {
    setPreferences((current) => ({
      ...current,
      [key]: checked,
    }));
  }

  function savePreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast.add({
      type: "success",
      title: "Preferences saved",
    });
  }

  return (
    <AppLayout
      title="Settings"
      description="Manage your profile, security and notification preferences."
    >
      <Card className="rounded-2xl border-gray-200">
        <CardContent className="p-0">
          <Tabs defaultValue="profile">
            <div className="border-b px-4 pt-2 sm:px-6">
              <TabsList className="h-auto w-full justify-start gap-6 rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="profile"
                  className="rounded-none border-0 border-b-2 border-transparent px-1 py-3 data-[active]:border-primary data-[active]:bg-transparent data-[active]:shadow-none"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-none border-0 border-b-2 border-transparent px-1 py-3 data-[active]:border-primary data-[active]:bg-transparent data-[active]:shadow-none"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="rounded-none border-0 border-b-2 border-transparent px-1 py-3 data-[active]:border-primary data-[active]:bg-transparent data-[active]:shadow-none"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="rounded-none border-0 border-b-2 border-transparent px-1 py-3 data-[active]:border-primary data-[active]:bg-transparent data-[active]:shadow-none"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4 sm:p-6">
              <TabsContent value="profile" className="mt-0">
                <div className="max-w-xl">
                  <div className="mb-6 flex items-center gap-4">
                    <Avatar className="size-16 shrink-0">
                      <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-700">
                        UM
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="font-semibold">Usman Muhammad</p>
                      <p className="text-sm text-muted-foreground">
                        usman@example.com
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() =>
                          toast.add({
                            type: "info",
                            title: "Connect this to your photo upload flow.",
                          })
                        }
                      >
                        Change photo
                      </Button>
                    </div>
                  </div>

                  <form onSubmit={saveProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={UserIcon}
                          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(event) =>
                            updateProfile("name", event.target.value)
                          }
                          className="pl-9"
                          aria-invalid={!!profileErrors.name}
                        />
                      </div>
                      {profileErrors.name && (
                        <p className="text-sm text-destructive">
                          {profileErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={Mail01Icon}
                          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(event) =>
                            updateProfile("email", event.target.value)
                          }
                          className="pl-9"
                          aria-invalid={!!profileErrors.email}
                        />
                      </div>
                      {profileErrors.email && (
                        <p className="text-sm text-destructive">
                          {profileErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          +234
                        </span>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(event) =>
                            updateProfile("phone", event.target.value)
                          }
                          className="pl-14"
                          aria-invalid={!!profileErrors.phone}
                        />
                      </div>
                      {profileErrors.phone && (
                        <p className="text-sm text-destructive">
                          {profileErrors.phone}
                        </p>
                      )}
                    </div>

                    <Button type="submit">Save changes</Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <div className="max-w-xl space-y-6">
                  <div>
                    <h3 className="font-semibold">Change password</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a strong password you don't use anywhere else.
                    </p>

                    <form
                      onSubmit={updatePassword}
                      className="mt-4 space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current password
                        </Label>
                        <div className="relative">
                          <HugeiconsIcon
                            icon={LockPasswordIcon}
                            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            id="currentPassword"
                            type="password"
                            value={password.currentPassword}
                            onChange={(event) =>
                              updatePasswordField(
                                "currentPassword",
                                event.target.value,
                              )
                            }
                            className="pl-9"
                            aria-invalid={!!passwordErrors.currentPassword}
                          />
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-destructive">
                            {passwordErrors.currentPassword}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New password</Label>
                        <div className="relative">
                          <HugeiconsIcon
                            icon={LockPasswordIcon}
                            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            id="newPassword"
                            type="password"
                            value={password.password}
                            onChange={(event) =>
                              updatePasswordField(
                                "password",
                                event.target.value,
                              )
                            }
                            className="pl-9"
                            aria-invalid={!!passwordErrors.password}
                          />
                        </div>
                        {passwordErrors.password && (
                          <p className="text-sm text-destructive">
                            {passwordErrors.password}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm new password
                        </Label>
                        <div className="relative">
                          <HugeiconsIcon
                            icon={LockPasswordIcon}
                            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={password.confirmPassword}
                            onChange={(event) =>
                              updatePasswordField(
                                "confirmPassword",
                                event.target.value,
                              )
                            }
                            className="pl-9"
                            aria-invalid={!!passwordErrors.confirmPassword}
                          />
                        </div>
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-destructive">
                            {passwordErrors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <Button type="submit">Update password</Button>
                    </form>
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Shield01Icon}
                          className="size-4 text-emerald-600"
                        />
                        <h3 className="font-semibold">
                          Two-factor authentication
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>

                    <Switch
                      checked={twoFactor}
                      onCheckedChange={toggleTwoFactor}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold">Active sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Devices currently signed in to your account.
                    </p>

                    <div className="mt-3 divide-y">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between gap-4 py-4"
                        >
                          <div className="min-w-0">
                            <p className="font-medium">{session.device}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.location}
                            </p>
                          </div>

                          {session.current ? (
                            <span className="shrink-0 text-xs text-muted-foreground">
                              This device
                            </span>
                          ) : (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="shrink-0 text-destructive hover:text-destructive"
                              onClick={() =>
                                toast.add({
                                  type: "success",
                                  title: "Session revoked",
                                })
                              }
                            >
                              <HugeiconsIcon
                                icon={Logout01Icon}
                                className="size-4"
                              />
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <div className="max-w-xl space-y-2">
                  {notificationOptions.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-4 rounded-xl border p-4"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <Switch
                        checked={preferences[item.key]}
                        onCheckedChange={(checked) =>
                          updateNotification(item.key, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <form
                  onSubmit={savePreferences}
                  className="max-w-xl space-y-4"
                >
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value="NGN" disabled>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">
                          Nigerian Naira (₦)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={(value) => setLanguage(value ?? "")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default network</Label>
                    <Select
                      value={defaultNetwork}
                      onValueChange={(value) => setDefaultNetwork(value ?? "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map((network) => (
                          <SelectItem key={network.id} value={network.id}>
                            {network.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit">Save preferences</Button>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
}