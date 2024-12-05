import {
  Book,
  Briefcase,
  Home,
  Inbox,
  LayoutDashboard,
  LayoutDashboardIcon,
  Projector,
} from "lucide-react";

// Menu items.
export const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Docs",
    url: "#",
    icon: Book,
  },
  {
    title: "DashBoard",
    url: "#",
    icon: LayoutDashboardIcon,
  },
];

export const PathItems = [
  {
    title: "WorkShop",
    url: "/dashboard",
    icon: Briefcase,
    subItems: [
      {
        title: "Overview",
        url: "/dashboard/overview",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
  {
    title: "Select Project",
    url: "/projects",
    icon: Projector,
    subItems: [
      {
        title: "Active Projects",
        url: "/projects/active",
      },
      {
        title: "Completed Projects",
        url: "/projects/completed",
      },
      {
        title: "Archived Projects",
        url: "/projects/archived",
      },
    ],
  },
  // Add more main menu items as needed
];
