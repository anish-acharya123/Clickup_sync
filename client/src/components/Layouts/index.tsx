import Footer from "./Footer";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layouts/AppSidebar";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isSidebarVisible =
    location.pathname !== "/login" && location.pathname !== "/";
  // &&
  // location.pathname !== "*";
  return (
    <div className="bg-gradient-to-r  from-blue-50 to-blue-100 via-[#e8fbff]">
      <SidebarProvider>
        {isSidebarVisible && <AppSidebar />}
        <div className="w-full min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 ">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
