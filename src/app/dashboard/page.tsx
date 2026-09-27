import AdminDashboard from "@/components/dashboard/dashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function DashboardPage() {
  return <AdminDashboard/>;
}