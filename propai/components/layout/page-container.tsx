"use client";

import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageContainer({
  children,
  className,
  noPadding = false,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "flex-1 overflow-auto",
        !noPadding && "p-6",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto",
          !noPadding && "bg-card rounded-xl border border-border shadow-sm"
        )}
      >
        {children}
      </div>
    </main>
  );
}

// Variant for full-bleed content (like conversations view)
export function PageContainerFullBleed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("flex-1 overflow-auto", className)}>{children}</main>
  );
}

