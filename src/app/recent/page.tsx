import RecentChanges from "@/components/recent/RecentChange";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Recent Activity",
};
export default function RecentChangesPage() {
  return (
    <main className="min-h-screen">
      <RecentChanges />
    </main>
  );
}
