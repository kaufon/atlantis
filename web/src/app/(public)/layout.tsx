import { DashboardLayout } from "@/ui/components/layouts/dashboard"
import type { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}
const Layout = ({children}: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>
}
export default Layout
