import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import axios from "axios";
import { FolderDown, Logs } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SidebarWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState<any>([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchWorkspaceTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/workspace-tasks",
          {
            withCredentials: true,
          }
        );
        setWorkspaces(response.data.workspaces);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Failed to fetch workspace tasks:", error);
      }
    };

    fetchWorkspaceTasks();
  }, []);

  console.log(workspaces, tasks);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        {workspaces &&
          workspaces.map((workspace: any) => (
            <SidebarMenu key={workspace.id}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FolderDown className="text-yellow-700" />
                  <span>{workspace.name}</span>
                </SidebarMenuButton>
                {/* Nested Tasks */}
                <SidebarMenuSub>
                  {tasks
                    .filter((task: any) => task.team_id === workspace.id)
                    .map((task: any) => (
                      <SidebarMenuSubItem key={task.id} className="">
                        <SidebarMenuButton asChild>
                          <Link to={`/task/${task.id}`}>
                            <Logs />
                            <span>{task.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarWorkspaces;
