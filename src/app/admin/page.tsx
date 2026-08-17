import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Owner Admin | DD's",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="min-h-dvh bg-brand-muted-warm">
      <AdminPanel />
    </div>
  );
}
