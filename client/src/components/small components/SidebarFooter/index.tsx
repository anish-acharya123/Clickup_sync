import { Button } from "@/components/ui/button";

import { SidebarFooter } from "@/components/ui/sidebar";
import { HelpCircle, User } from "lucide-react";

const SidebarFooterComponent = () => {
  return (
    <SidebarFooter>
      <div className="flex w-full gap-2  justify-between">
        <Button className="flex-1" variant={"secondary"}>
          <span>
            <User />
          </span>
          <span>Invite</span>
        </Button>
        <Button className="flex-1" variant={"secondary"}>
          <span>
            <HelpCircle />
          </span>
          <span>Help</span>
        </Button>
      </div>
    </SidebarFooter>
  );
};

export default SidebarFooterComponent;
