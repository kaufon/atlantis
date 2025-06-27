import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/ui/style/globals.css";
import { RootLayout } from "@/ui/components/layouts";

export const metadata: Metadata = {
  title: "Atlantis",
  description: "Atlantis"
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <RootLayout>
    {children}
  </RootLayout>;
}
