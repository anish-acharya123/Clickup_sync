import SidebarFooterComponent from "@/components/small components/SidebarFooter";
import SidebarProfile from "@/components/small components/SidebarProfile";
import SidebarRoutes from "@/components/small components/SidebarRoutes";
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {PathItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ///side bar footer */}
      <SidebarFooterComponent />
    </Sidebar>
  );
}
