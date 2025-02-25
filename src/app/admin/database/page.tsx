"use client";
import Form from "next/form";
import { runMigration } from "@/features/admin-dashboard/action";
import { MigrationButton } from "@/features/admin-dashboard/components/migration-button";

export default function AdminDevelopersPage() {
  return (
    <div className="py-4">
      <Form action={runMigration}>
        <MigrationButton
          text="Run Migration"
          loadingText="Running Migration..."
        />
      </Form>
    </div>
  );
}
