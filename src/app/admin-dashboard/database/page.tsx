"use client";
import {
  runDataMigration,
  runMigration
} from "@/features/admin-dashboard/action";
import { DataMigrationButton } from "@/features/admin-dashboard/components/data-migration-button";
import { MigrationButton } from "@/features/admin-dashboard/components/migration-button";
import Form from "next/form";
import { useState } from "react";

export default function AdminDevelopersPage() {
  const [migrationResult, setMigrationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      const result = await runMigration();
      setMigrationResult(result);
    } catch (error) {
      console.error("Migration failed:", error);
      setMigrationResult({
        status: 'error',
        message: 'Failed to run migration',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-4">
      <MigrationButton
        onClick={onClick}
        isLoading={isLoading}
      />

      {migrationResult && (
        <div className={`mt-4 p-3 rounded ${migrationResult.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {migrationResult.message}
          {migrationResult.timestamp}
        </div>
      )}

      <Form action={runDataMigration} className="my-4">
        <DataMigrationButton
          text="Run data Migration"
          loadingText="Running data Migration..."
        />
      </Form>
    </div>
  );
}