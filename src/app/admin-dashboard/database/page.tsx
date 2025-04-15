"use client";
import Form from "next/form";
import {
  runDataMigration,
  runMigration,
} from "@/features/admin-dashboard/action";
import { MigrationButton } from "@/features/admin-dashboard/components/migration-button";
import { DataMigrationButton } from "@/features/admin-dashboard/components/data-migration-button";

export default function AdminDevelopersPage() {
  return (
    <div className="py-4">
      <Form action={runMigration}>
        <MigrationButton
          text="Run Migration"
          loadingText="Running Migration..."
        />
      </Form>
      <Form action={runDataMigration} className="my-4">
        <DataMigrationButton
          text="Run data Migration"
          loadingText="Running data Migration..."
        />
      </Form>
    </div>
  );
}
