"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, User, Bell, Activity, Shield, Building2, Palette, CreditCard, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const userSettingsNav: NavItem[] = [
  { label: "Profile", href: "/dashboard/account", icon: User },
  { label: "Notifications", href: "/dashboard/account/notifications", icon: Bell },
  { label: "Activity Log", href: "/dashboard/account/activity", icon: Activity },
  { label: "Security", href: "/dashboard/account/security", icon: Shield },
];

const orgSettingsNav: NavItem[] = [
  { label: "Organization", href: "/dashboard/settings", icon: Building2 },
  { label: "Branding", href: "/dashboard/settings/branding", icon: Palette },
  { label: "Notifications", href: "/dashboard/settings/notifications", icon: Bell },
  { label: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
  { label: "Security", href: "/dashboard/settings/security", icon: Lock },
];

export function SettingsNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine mode based on current path
  const isUserSettings = pathname.startsWith("/dashboard/account");
  const navItems = isUserSettings ? userSettingsNav : orgSettingsNav;
  const title = isUserSettings ? "Account Settings" : "Organization Settings";

  const isActive = (href: string) => {
    if (href === "/dashboard/account" || href === "/dashboard/settings") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex h-full w-[220px] flex-col border-r border-secondary-panel-border bg-icon-rail">
      {/* Header */}
      <div className="flex h-14 items-center px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Title */}
      <div className="px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-propai-accent/10 text-propai-accent font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
