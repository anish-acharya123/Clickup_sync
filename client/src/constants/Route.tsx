import DashBoard from "@/pages/Dashboard";
import EachTask from "@/pages/EachTask";
import Login from "@/pages/Login";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <DashBoard />,
    protected: true,
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
  },
];
