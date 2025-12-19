import { SettingsLayout } from "@/components/layout/settings-panel/settings-layout";

export default function AccountSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}

