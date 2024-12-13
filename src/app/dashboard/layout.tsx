// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { DashboardSidebar } from "../../features/admin/components/dashboard-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <SidebarProvider>
    //   <DashboardSidebar />
    <main className="w-full">
      {/* <SidebarTrigger /> */}
      {children}
    </main>
    // </SidebarProvider>
  );
}
