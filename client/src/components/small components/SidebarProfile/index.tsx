/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import customUseQuery from "@/hooks/customUseQuery";
import { ChevronDown, Plus, Settings } from "lucide-react";

const SidebarProfile = () => {
  const { data, isLoading, isFetching, error } = customUseQuery<any>(
    ["userInfo"],
    "http://localhost:5000/user/info",
    {
      withCredentials: true,
    }
  );
  console.log(isLoading, isFetching, error);
  return (
    <div>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <span className="bg-green-500 px-2 py-1 text-white rounded-full">
                    {data?.user.initials}
                  </span>
                  <span>{data?.user.username}</span>
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <Settings />
                  <span> Setting</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
                <hr />
                <DropdownMenuItem>
                  <Plus />
                  <span>Add Workshop</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </div>
  );
};

export default SidebarProfile;
