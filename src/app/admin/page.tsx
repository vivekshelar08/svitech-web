import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <AdminPanel />
    </div>
  );
}
