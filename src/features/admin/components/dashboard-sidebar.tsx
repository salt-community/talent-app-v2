import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        Some stuff
        <SidebarGroup />
        Some stuff
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
