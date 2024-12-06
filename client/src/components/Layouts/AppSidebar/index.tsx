import SidebarFooterComponent from "@/components/small components/SidebarFooter";
import SidebarProfile from "@/components/small components/SidebarProfile";
import SidebarRoutes from "@/components/small components/SidebarRoutes";
import SidebarWorkspaces from "@/components/small components/SidebarWorkspaces";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { PathItems } from "@/constants/Sliderbar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <p className="text-xl font-medium text-center ">ClickUp_Sync</p>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarProfile />
        </SidebarGroup>
        <hr />

        {/* sidebar body  */}
        <SidebarRoutes />
        <hr />

        <SidebarWorkspaces />
      </SidebarContent>

      {/* ///side bar footer */}
      <SidebarFooterComponent />
    </Sidebar>
  );
}
