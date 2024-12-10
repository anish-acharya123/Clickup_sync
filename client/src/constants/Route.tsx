import NotFound from "@/pages/404/NotFound";
import DashBoard from "@/pages/Dashboard";
import EachTask from "@/pages/EachTask";
import Login from "@/pages/Login";
import WorkSpace from "@/pages/Workspace";

export const routes = [
  {
    id: 1,
    path: "/",
    protected: true,
    redirect: "/dashboard",
  },
  {
    id: 2,
    path: "/login",
    element: <Login />,
  },
  {
    id: 3,
    path: "/task/:taskId",
    element: <EachTask />,
    protected: true,
  },
  {
    id: 4,
    path: "/dashboard",
    protected: true,
    element: <DashBoard />,
  },
  {
    id: 5,
    path: "/workspace/:workspaceId",
    protected: true,
    element: <WorkSpace />,
  },
  {
    id: 6,
    path: "*",
    element: <NotFound />,
  },
];
