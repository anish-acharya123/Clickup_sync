/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Link, useNavigate } from "react-router-dom";

const SidebarWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState<any>([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        {workspaces &&
          workspaces.map((workspace: any) => (
            <SidebarMenu key={workspace.id}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate(`/workspace/${workspace.id}`)}
                >
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
