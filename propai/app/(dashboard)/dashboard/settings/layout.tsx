import { SettingsLayout } from "@/components/layout/settings-panel/settings-layout";

export default function OrgSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}

